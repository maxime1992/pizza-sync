import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ng2-webstorage';

import { IStore } from 'app/shared/interfaces/store.interface';
import * as UsersActions from 'app/shared/states/users/users.actions';

@Component({
  selector: 'app-identification-dialog',
  templateUrl: './identification-dialog.component.html',
  styleUrls: ['./identification-dialog.component.scss'],
})
export class IdentificationDialogComponent implements OnInit {
  public identificationForm: FormGroup;
  public isIdentifying$: Observable<boolean>;

  constructor(
    private store$: Store<IStore>,
    private fb: FormBuilder,
    private storage: LocalStorageService
  ) {}

  ngOnInit() {
    this.isIdentifying$ = this.store$.select(
      state => state.users.isIdentifying
    );

    const username = this.storage.retrieve('username') || '';

    this.identificationForm = this.fb.group({
      username: [username, Validators.required],
    });
  }

  onSubmit({ value }: FormGroup) {
    this.store$.dispatch(new UsersActions.Identification(value.username));

    this.identificationForm.controls['username'].disable();
  }
}
