import * as UiActions from 'app/shared/states/ui/ui.actions';
import { uiInitialState } from 'app/shared/states/ui/ui.initial-state';
import { IUi } from 'app/shared/states/ui/ui.interface';

export function uiReducer(
  ui: IUi = uiInitialState(),
  action: UiActions.All
): IUi {
  switch (action.type) {
    case UiActions.SET_LANGUAGE: {
      return {
        ...ui,
        language: action.payload.language,
      };
    }

    case UiActions.TOGGLE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: !ui.isSidenavVisible,
      };
    }

    case UiActions.OPEN_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: true,
      };
    }

    case UiActions.CLOSE_SIDENAV: {
      return {
        ...ui,
        isSidenavVisible: false,
      };
    }

    case UiActions.OPEN_DIALOG_IDENTIFICATION: {
      return {
        ...ui,
        isDialogIdentificationOpen: true,
      };
    }

    case UiActions.CLOSE_DIALOG_IDENTIFICATION: {
      return {
        ...ui,
        isDialogIdentificationOpen: false,
      };
    }

    case UiActions.OPEN_DIALOG_ORDER_SUMMARY: {
      return {
        ...ui,
        isDialogOrderSummaryOpen: true,
      };
    }

    case UiActions.CLOSE_DIALOG_ORDER_SUMMARY: {
      return {
        ...ui,
        isDialogOrderSummaryOpen: false,
      };
    }

    case UiActions.UPDATE_PIZZERIA_INFORMATION: {
      return {
        ...ui,
        pizzeria: { ...action.payload },
      };
    }

    case UiActions.UPDATE_PIZZA_SEARCH: {
      return {
        ...ui,
        pizzaSearch: action.payload.search,
      };
    }

    case UiActions.TOGGLE_VISIBILITY_FILTER_INGREDIENT: {
      return {
        ...ui,
        isFilterIngredientVisible: !ui.isFilterIngredientVisible,
      };
    }

    default:
      return ui;
  }
}
