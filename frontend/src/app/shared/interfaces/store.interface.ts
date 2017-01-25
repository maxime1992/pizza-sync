import { IUi } from './../state/ui/ui.interface';
import { IPizzas } from './../state/pizzas/pizzas.interface';

export interface IStore {
  ui: IUi;
  pizzas: IPizzas;
}
