const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const vorpal = require('vorpal')();
const bodyParser = require('body-parser');

const { AppController } = require('./controllers/app.controller');
const { PizzaProvider } = require('./pizzas-providers/parse-pizza-provider');

const pizzaProvider = new PizzaProvider();
let pizzaParserClass = pizzaProvider.getDefaultProvider();
let pizzaParser = new pizzaParserClass();
let appCtrl = new AppController(pizzaParser);

const currentDate = new Date();

// ----------------------------------------------------------------------------

let isServerStarted = false;
let commandsAlreadyRegistered = false;

// we instanciate the whole server
loadServer();

function loadServer() {
  appCtrl
    .parsePizzaProvider()
      .then(_ => {
        app.use(bodyParser.json());

        const corsOptions = {
          credentials: false
        };
        app.use(cors(corsOptions));

        app.use(express.static('public'));

        app.get('/initial-state', (req, res) => {
          res.json(appCtrl.getInitialState());
        });

        manageSockets();

        appCtrl.getOrdersModel().setHourEnd(currentDate.getHours() + 1);
        appCtrl.getOrdersModel().setMinuteEnd(currentDate.getMinutes());

        if (!isServerStarted) {
          isServerStarted = true;
          server.listen(3000);
        }

        manageCommands();
      });
  }

function manageSockets() {

  io.sockets.on('connection', socket => {
    let currentUser = null;

    socket.emit('SET_COUNTDOWN', {
      hour: appCtrl.getOrdersModel().getHourEnd(),
      minute: appCtrl.getOrdersModel().getMinuteEnd()
    });

    socket.on('CONNECT_USER', username => {
      const user = appCtrl.getUsersModel().getUser(username);

      if (user) {
        appCtrl.getUsersModel().setUserOnline(user);

        currentUser = user;
        io.sockets.emit('CONNECT_USER_SUCCESS', user);
      } else {

        appCtrl.getUsersModel().addUser(username).then(user => {
          appCtrl.getUsersModel().setUserOnline(user);
          currentUser = user;
          io.sockets.emit('CONNECT_USER_SUCCESS', user);
        });
      }
    });

    socket.on('ADD_ORDER', orderWithoutId => {
      // TODO : block if current time >= hourEnd and minuteEnd
      const order = appCtrl.getOrdersModel().addOrder(orderWithoutId);

      io.sockets.emit('ADD_ORDER_SUCCESS', order);
    });

    socket.on('REMOVE_ORDER', orderId => {
      // TODO : block if current time >= hourEnd and minuteEnd
      if (appCtrl.getOrdersModel().removeOrder(orderId)) {
        io.sockets.emit('REMOVE_ORDER_SUCCESS', orderId);
      }
    });

    socket.on('disconnect', () => {
      if (currentUser === null) {
        return;
      }
      appCtrl.getUsersModel().setUserOffline(currentUser);
      if (appCtrl.getUsersModel().getNbConnectionsUser(currentUser) === 0) {
        io.sockets.emit('DISCONNECT_USER_SUCCESS', currentUser.id);
      }
    });
  });

}

function manageCommands() {
  if (commandsAlreadyRegistered) return;
  commandsAlreadyRegistered = true;
  vorpal
    .command('provider <provider>', 'Change current provider')
    .description('Set the new provider')
    .autocomplete(pizzaProvider.getAvailableProviders())
    .action((args, callback) => {

      if (appCtrl.getUsersModel().getNbConnections()) {
        console.error('Some users are already connected, you shall stop server before');
        return callback();
      }

      if (typeof args.provider === 'undefined') {
        console.error('You need to define the new provider');
        return callback();
      }

      pizzaParserClass = pizzaProvider.get(args.provider);
      if (!pizzaParserClass) {
        console.error('Provider is not known');
        return callback();
      }
      pizzaParser = new pizzaParserClass();
      appCtrl = new AppController(pizzaParser);

      // we reload the app
      loadServer();
      return callback();
    });
  vorpal
    .command('providers', 'List available providers')
    .action((args, callback) => {
      console.log('Here are the handsome providers available (current between curly brackets)');
      const currentProvider = pizzaProvider.getNameFromClass(pizzaParserClass);
      pizzaProvider.getAvailableProviders().map( providerName => {
        let message = providerName;
        if (providerName === currentProvider) {
          message = `{${message}}`;
        }
        console.log(`- ${message}`);
      });
      return callback();
    });

  vorpal
    .command('countdown', 'Set or change when to stop the orders')
    .option('--hour <hour>', 'Set or change the hour when to block the orders')
    .option('--minute <minute>', 'Set or change the minute when to block the orders')
    .action((args, callback) => {
      if (typeof args.options.hour === 'undefined' || typeof args.options.minute === 'undefined') {
        console.error('You need to define --hour and --minute');
        return callback();
      }

      if (typeof args.options.hour !== 'number' || typeof args.options.minute !== 'number') {
        console.error('"hour" and "minute" should be integers');
        return callback();
      }

      const hourEnd = parseInt(args.options.hour);
      const minuteEnd = parseInt(args.options.minute);

      if (hourEnd < 0 || hourEnd > 23) {
        console.error('"hour" must be between 0 and 23');
        return callback();
      }

      if (minuteEnd < 0 || minuteEnd > 59) {
        console.error('"minute" must be between 0 and 59');
        return callback();
      }

      appCtrl.getOrdersModel().setHourEnd(hourEnd);
      appCtrl.getOrdersModel().setMinuteEnd(minuteEnd);

      io.sockets.emit('SET_COUNTDOWN', {
        hour: appCtrl.getOrdersModel().getHourEnd(),
        minute: appCtrl.getOrdersModel().getMinuteEnd()
      });

      callback();
    });

  vorpal
    .delimiter('pizza-sync$')
    .show();
}
