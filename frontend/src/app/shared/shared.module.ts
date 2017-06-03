import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from 'ng2-translate';
import { PrettyJsonModule } from 'angular2-prettyjson';
// we now have to import every sub modules of material we want to use
import {
  MdButtonModule, MdCardModule, MdDialogModule, MdIconModule,
  MdInputModule, MdListModule, MdProgressSpinnerModule, MdRippleModule, MdSidenavModule,
  MdTabsModule, MdToolbarModule, MdTooltipModule, MdSelectModule
} from '@angular/material';
import { JoinPipe } from './pipes/join.pipe';

const MaterialModules = [
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdRippleModule,
  MdSidenavModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdSelectModule
];

/**
 * this module should be imported in every sub-modules
 * you can define here the modules, components, pipes that you want to re-use all over your app
 */
export const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  RouterModule,
  FlexLayoutModule,
  StoreModule,
  TranslateModule,
  PrettyJsonModule,
  ...MaterialModules
];

export const declarations = [JoinPipe];

@NgModule({
  imports: modules,
  exports: [...modules, ...declarations],
  declarations
})
export class SharedModule { }
