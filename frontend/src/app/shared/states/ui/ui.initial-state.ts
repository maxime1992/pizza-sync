import { IUi } from 'app/shared/states/ui/ui.interface';

export function uiInitialState(): IUi {
  return {
    language: '',
    isSidenavVisible: true,
    isDialogIdentificationOpen: true,
    isDialogOrderSummaryOpen: false,
    isFilterIngredientVisible: false,
    pizzaSearch: '',

    // pizzeria information
    pizzeria: {
      name: '',
      phone: '',
      url: '',
    },
  };
}
