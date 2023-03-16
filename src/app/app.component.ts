import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { DrinkModel, StoreState } from './interfaces';
import { gettingDrinksAction } from './ngrx/actions';
import {
  selectDrinks,
  selectIsLoading,
  selectLoadError,
  selectLoadSuccess,
} from './ngrx/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'drunkenstein';
  isloading$: Observable<boolean>;
  drinks$: Observable<DrinkModel[]>;
  loadSuccess$: Observable<boolean | null>;
  loadError$: Observable<boolean | null>;
  drinks: DrinkModel[] = [];
  appState$ = this._store.pipe(map((state: any) => state));

  idControl = new FormControl();
  nameControl = new FormControl(null, Validators.required);
  priceControl = new FormControl(null, Validators.required);
  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    price: this.priceControl,
  });

  constructor(private _store: Store<StoreState>) {
    this.isloading$ = this._store.select(selectIsLoading);
    this.drinks$ = this._store.select(selectDrinks);
    this.loadSuccess$ = this._store.select(selectLoadSuccess);
    this.loadError$ = this._store.select(selectLoadError);
  }

  ngOnInit(): void {
    this._store.dispatch(gettingDrinksAction());

    // OLD:
    // this._bartenderService.getDrinks().subscribe(
    //   (drinks) =>
    //     (this.drinks = drinks.map((drink: DrinkModel) => {
    //       drink.price = drink.price ?? drink.name.length ?? 0;
    //       return drink;
    //     }))
    // );
  }

  addDrink(): void {
    if (this.idControl.value) {
      const editIndex = this.drinks.findIndex(
        (drink: DrinkModel) => drink.id === this.idControl.value
      );
      if (editIndex !== -1) {
        const drinkToEdit = this.drinks[editIndex];
        drinkToEdit.name = this.nameControl.value;
        drinkToEdit.price = this.priceControl.value;
      }
    } else {
      this.idControl.setValue(Date.now().toString());
      this.drinks.push(this.form.value);
    }
    this.form.reset();
  }

  cancelDrinkEdit(): void {
    this.form.reset();
  }

  deleteDrink(drinkId: string): void {
    const toBeRemovedId = this.drinks.findIndex(
      (drink: DrinkModel) => drink.id === drinkId
    );
    if (toBeRemovedId !== -1) {
      this.drinks.splice(toBeRemovedId, 1);
    }
  }

  editDrink(drink: DrinkModel): void {
    this.idControl.setValue(drink.id);
    this.nameControl.setValue(drink.name);
    this.priceControl.setValue(drink.price);
  }
}
