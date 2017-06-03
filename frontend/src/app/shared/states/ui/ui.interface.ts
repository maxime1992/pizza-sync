export interface IUi {
  readonly language: string;
  readonly isSidenavVisible: boolean;
  readonly isDialogIdentificationOpen: boolean;
  readonly isDialogOrderSummaryOpen: boolean;
  readonly isFilterIngredientVisible: boolean;
  readonly pizzaSearch: string;

  // pizzeria information
  readonly pizzeria: {
    readonly name: string;
    readonly phone: string;
    readonly url: string;
  };
}
