import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';
import { GuardService } from './../shared/services/guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [GuardService],
    component: FeaturesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class FeaturesRoutingModule { }
