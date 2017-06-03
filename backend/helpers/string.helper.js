/**
 * cleanIngredientName
 *
 * @param {string} ingredientName
 * @returns {string} The cleaned ingredient name
 */
function cleanIngredientName(ingredientName) {
  return ingredientName.trim().toLowerCase()
}

module.exports = { cleanIngredientName }
