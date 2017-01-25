import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class FeaturesRoutingModule { }
