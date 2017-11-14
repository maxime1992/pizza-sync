const { DefaultParser } = require('./default-parser');

const url = 'https://www.tutti-pizza.com/fr/boutique/pizzas.php';
const name = 'TuttiPizza';

/**
 * We only fetch data that are on the home page.
 * We didn't manage other pages right now.
 */
class TuttiPizza extends DefaultParser {

  constructor() {
    super(name, url);
  }

  parsePhone() {
    return '';
  }

  parseSectionDom() {
    return this._$('#listProduct .row');
  }

  parsePizzaCategory() {
    return this._sectionDom.prev().text();
  }

  parsePizzasDom() {
    return this._sectionDom.find(this._$('.item'));
  }

  parsePizzaName() {
    return this._pizzaDom.find(this._$('.item-name')).text();
  }

  parsePizzaIngredients() {
    return this._pizzaDom.find(this._$('.item-ingredients')).text();
  }

  parsePrices() {
    return this._pizzaDom.find(this._$('.item-price'));
  }

  parsePizzaImage() {
   return this._pizzaDom.find('.item-img img').attr('src');
  }
}

module.exports = { TuttiPizza };
