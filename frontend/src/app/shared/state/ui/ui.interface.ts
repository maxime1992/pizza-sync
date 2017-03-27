export interface IUi {
  language: string;
  isSidenavVisible: boolean;
  isDialogIdentificationOpen: boolean;

  // pizzeria information
  pizzeria: {
    name: string;
    phone: string;
    url: string;
  };
}
