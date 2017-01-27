import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from 'ng2-translate';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { OrdersService } from './services/orders.service';

export const modules = [
  CommonModule,
  FormsModule,
  HttpModule,
  RouterModule,
  MaterialModule,
  FlexLayoutModule,
  StoreModule,
  StoreDevtoolsModule,
  TranslateModule,
  PrettyJsonModule
];

export const declarations = [];

export const providers = [OrdersService];

@NgModule({
  imports: modules,
  exports: [...modules, ...declarations],
  declarations,
  providers
})
export class SharedModule { }
