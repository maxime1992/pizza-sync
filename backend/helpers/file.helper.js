const fs = require('fs')
const { cleanPizzaName, removeLocalPath } = require('./string.helper')

/**
 * getPathImgPizza
 *
 * check if the image of a pizza is available
 * if available    : it returns the path of the image
 * if not available: it returns the path of the default image
 *
 * @param {string} pizzaName The pizza name
 * @param {string} folderPath The folder where to check if the file exists
 * @returns {string} The cleaned pizza name
 */
function getPathImgPizza(pizzaName, folderPath) {
  const pizzaImgPath = `${folderPath}/${cleanPizzaName(pizzaName)}.png`

  if (fs.existsSync(pizzaImgPath)) {
    return removeLocalPath(pizzaImgPath)
  }

  return 'assets/img/pizzas-providers/pizza-default.png'
}

module.exports = { getPathImgPizza }
