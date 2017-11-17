export abstract class PizzasProvider {
  /**
   * used to display in lists
   */
  abstract longCompanyName: string;

  /**
   * used to write in console autocomplete
   */
  abstract shortCompanyName: string;

  // this should be the first method to call on a pizza provider
  // it'll try to fetch and parse all the required data and then
  // will give us an access to synchronous data on a pizza provider
  abstract fetchParseAndUpdate(): Promise<PizzasProvider>;

  abstract getCompleteAndNormalizedInformation(): {
    pizzeria: { name: string; phone: string; url: string };
    pizzas: any[];
    pizzasCategories: any[];
    ingredients: any[];
  };
}
