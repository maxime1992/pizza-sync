import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesModule } from './features/features.module';

// needed to for AOT
export function loadFeaturesModule() {
  return FeaturesModule;
}

const routes: Routes = [
  {
    path: '',
    loadChildren: loadFeaturesModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
