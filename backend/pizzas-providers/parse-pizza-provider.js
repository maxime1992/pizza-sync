const conf = require('../conf.json');

const { TuttiPizza } = require('./parse-tutti-pizza');
const { PizzaDeLOrmeau } = require('./parse-pizza-de-l-ormeau');

const providers = {
  'tutti': TuttiPizza,
  'ormeau': PizzaDeLOrmeau
};

/**
 * This class allows to instanciate pizza provider from a configuration.
 */
class PizzaProvider {

  /**
   * @param provider the provider string used as described in the conf.json in `providers` section.
   * @return the parser class associated to the provider string, null otherwise.
   */
  get(provider) {
    return providers[provider];
  }

  getDefaultProvider() {
    return this.get(conf.defaultProvider);
  }

  getAvailableProviders() {
    return Object.keys(providers);
  }

  getNameFromClass(clazz) {
    return Object.keys(providers).filter( key => providers[key] === clazz);
  }

}
module.exports = { PizzaProvider };

