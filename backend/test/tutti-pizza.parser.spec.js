let should = require('should');
require('mocha');
const { TuttiPizza } = require('../pizzas-providers/parse-tutti-pizza.js');

describe('>>>> Tutti parsing', function() {
    this.timeout(5000);
    it('Global run', function(done) {
      var tutti = new TuttiPizza();
      tutti
        .getPizzasAndPizzasCategories()
        .then(function (result) {
          result.pizzeria.name.should.ok();
          result.pizzeria.url.should.ok();
          result.pizzeria.phone.should.equal('');
          result.pizzas.length.should.be.above(30);
          done();
      }).catch( e =>  done(e));
    });
});
