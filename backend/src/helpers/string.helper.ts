import * as removeAccents from 'remove-accents';

export function cleanIngredientName(ingredientName: string): string {
  return ingredientName.trim().toLowerCase();
}

export function cleanIngredientNameAsId(ingredientName: string): string {
  return removeAccents(ingredientName)
    .trim()
    .replace(/[-\/ ]+/g, '-')
    .toLowerCase();
}

export function cleanPizzaName(name: string): string {
  return removeAccents(name)
    .trim()
    .replace(/[-\/ ]+/g, '-')
    .toLowerCase();
}

/**
 * pizzas images' path contains the whole path from / on the system
 * the frontend is not aware of that (hopefully), and thus we should remove
 * everything before assets/img/pizzas-providers...
 */
export function removeLocalPath(path: string): string {
  const re = /.*\/(assets\/img\/pizzas-providers\/.*)/;

  if (re.test(path)) {
    return re.exec(path)[1];
  }

  return path;
}
