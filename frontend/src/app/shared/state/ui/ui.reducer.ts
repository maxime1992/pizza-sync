import { ActionReducer, Action } from '@ngrx/store';

import { uiState } from './ui.initial-state';
import { IUi } from './ui.interface';

export class Ui {
  private static reducerName = 'UI_REDUCER';

  public static reducer(ui = uiState(), {type, payload}: Action) {
    if (typeof Ui.mapActionsToMethod[type] === 'undefined') {
      return ui;
    }

    return Ui.mapActionsToMethod[type](ui, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static SET_LANGUAGE = `${Ui.reducerName}_SET_LANGUAGE`;
  private static setLanguage(ui, type, payload) {
    return <IUi>{ ...ui, ...<IUi>{ language: payload } };
  }

  // tslint:disable-next-line:member-ordering
  public static TOGGLE_SIDENAV = `${Ui.reducerName}_TOGGLE_SIDENAV`;
  private static toggleSidenav(ui, type, payload) {
    return <IUi>{ ...ui, ...<IUi>{ isSidenavVisible: !ui.isSidenavVisible } };
  }

  // tslint:disable-next-line:member-ordering
  public static OPEN_SIDENAV = `${Ui.reducerName}_OPEN_SIDENAV`;
  private static openSidenav(ui, type, payload) {
    return <IUi>{ ...ui, ...<IUi>{ isSidenavVisible: true } };
  }

  // tslint:disable-next-line:member-ordering
  public static CLOSE_SIDENAV = `${Ui.reducerName}_CLOSE_SIDENAV`;
  private static closeSidenav(ui, type, payload) {
    return <IUi>{...ui, ...<IUi>{ isSidenavVisible: false }};
  }

  // tslint:disable-next-line:member-ordering
  public static OPEN_DIALOG_IDENTIFICATION = `${Ui.reducerName}_OPEN_DIALOG_IDENTIFICATION`;
  private static openDialogIdentification(ui, type, payload) {
    return <IUi>{...ui, ...<IUi>{ isDialogIdentificationOpen: true }};
  }

  // tslint:disable-next-line:member-ordering
  public static CLOSE_DIALOG_IDENTIFICATION = `${Ui.reducerName}_CLOSE_DIALOG_IDENTIFICATION`;
  private static closeDialogIdentification(ui, type, payload) {
    return <IUi>{...ui, ...<IUi>{ isDialogIdentificationOpen: false }};
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Ui.SET_LANGUAGE]: Ui.setLanguage,
    [Ui.TOGGLE_SIDENAV]: Ui.toggleSidenav,
    [Ui.OPEN_SIDENAV]: Ui.openSidenav,
    [Ui.CLOSE_SIDENAV]: Ui.closeSidenav,
    [Ui.OPEN_DIALOG_IDENTIFICATION]: Ui.openDialogIdentification,
    [Ui.CLOSE_DIALOG_IDENTIFICATION]: Ui.closeDialogIdentification
  };
}
