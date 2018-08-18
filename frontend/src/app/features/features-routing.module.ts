import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from 'app/features/features.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FeaturesRoutingModule {}
