import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ng2-webstorage';

import { IStore } from './../../shared/interfaces/store.interface';
import { Users } from './../../shared/state/users/users.reducer';

@Component({
  selector: 'app-identification-dialog',
  templateUrl: './identification-dialog.component.html',
  styleUrls: ['./identification-dialog.component.scss']
})
export class IdentificationDialogComponent implements OnInit {
  public identificationForm: FormGroup;
  public isIdentifying$: Observable<boolean>;

  constructor(
    private _store$: Store<IStore>,
    private _fb: FormBuilder,
    private _storage: LocalStorageService  ) { }

  ngOnInit() {
    this.isIdentifying$ = this._store$.select(state => state.users.isIdentifying);

    const username = this._storage.retrieve('username') || '';

    this.identificationForm = this._fb.group({
      username: [username, Validators.required]
    });
  }

  onSubmit({value}: FormGroup) {
    this._store$.dispatch({ type: Users.IDENTIFICATION, payload: value });

    this.identificationForm.controls['username'].disable();
  }
}
