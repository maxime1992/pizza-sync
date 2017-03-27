import { IUi } from './ui.interface';

export function uiState(): IUi {
  return {
    language: '',
    isSidenavVisible: true,
    isDialogIdentificationOpen: true,

    // pizzeria information
    pizzeria: {
      name: '',
      phone: '',
      url: ''
    }
  };
};
