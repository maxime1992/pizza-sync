const removeAccents = require('remove-accents')

/**
 * cleanIngredientName
 *
 * @param {string} ingredientName
 * @returns {string} The cleaned ingredient name
 */
function cleanIngredientName(ingredientName) {
  return ingredientName.trim().toLowerCase()
}

/**
 * cleanPizzaName
 *
 * clean the name of a pizza to match the format of the img on the server
 *
 * @param {string} name
 * @returns {string} The cleaned pizza name
 */
function cleanPizzaName(name) {
  name = removeAccents(name)

  return name
    .trim()
    .replace(/[-\/ ]+/g, '-')
    .toLowerCase();
}

/**
 * removeLocalPath
 *
 * pizzas images' path contains the whole path from / on the system
 * the frontend is not aware of that (hopefully), and thus we should remove
 * everything before assets/img/pizzas-providers...
 *
 * @param {string} path
 * @returns {string} The good path of the picture from the frontend point of view
 */
function removeLocalPath(path) {
  const re = /.*\/(assets\/img\/pizzas-providers\/.*)/

  if (re.test(path)) {
    return re.exec(path)[1]
  }

  return path;
}

module.exports = { cleanIngredientName, cleanPizzaName, removeLocalPath }
