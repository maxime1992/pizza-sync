import * as fs from 'fs';

import { cleanPizzaName, removeLocalPath } from './string.helper';

/**
 * check if the image of a pizza is available
 * if available    : it returns the path of the image
 * if not available: it returns the path of the default image
 */
export function getPathImgPizza(pizzaName: string, folderPath: string): string {
  const pizzaImgPath = `${folderPath}/${cleanPizzaName(pizzaName)}.png`;

  if (fs.existsSync(pizzaImgPath)) {
    return removeLocalPath(pizzaImgPath);
  }

  return 'assets/img/pizzas-providers/pizza-default.png';
}
