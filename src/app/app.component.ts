import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateInterface, DrinkModel } from './interfaces';
import {
  addDrinkAction,
  deleteDrinkAction,
  editDrinkAction,
  gettingDrinksAction,
} from './ngrx/actions';
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
  isLoading$ = this._store.select(selectIsLoading);
  drinks$ = this._store.select(selectDrinks);
  loadSuccess$ = this._store.select(selectLoadSuccess);
  loadError$ = this._store.select(selectLoadError);
  // OLD:
  // drinks: DrinkModel[] = [];

  idControl = new FormControl();
  nameControl = new FormControl(null, Validators.required);
  priceControl = new FormControl(null, Validators.required);
  form = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    price: this.priceControl,
  });

  constructor(private _store: Store<AppStateInterface>) {}

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
      this._store.dispatch(
        editDrinkAction({
          id: this.idControl.value,
          name: this.nameControl.value,
          price: this.priceControl.value,
        })
      );
    } else {
      this._store.dispatch(
        addDrinkAction({
          name: this.nameControl.value,
          price: this.priceControl.value,
        })
      );
    }

    // OLD:
    // if (this.idControl.value) {
    //   const editIndex = this.drinks.findIndex(
    //     (drink: DrinkModel) => drink.id === this.idControl.value
    //   );
    //   if (editIndex !== -1) {
    //     const drinkToEdit = this.drinks[editIndex];
    //     drinkToEdit.name = this.nameControl.value;
    //     drinkToEdit.price = this.priceControl.value;
    //   }
    // } else {
    //   this.idControl.setValue(Date.now().toString());
    //   this.drinks.push(this.form.value);
    // }
    this.form.reset();
  }

  cancelDrinkEdit(): void {
    this.form.reset();
  }

  deleteDrink(id: string): void {
    this._store.dispatch(
      deleteDrinkAction({
        id,
      })
    );

    // OLD:
    // const toBeRemovedId = this.drinks.findIndex(
    //   (drink: DrinkModel) => drink.id === drinkId
    // );
    // if (toBeRemovedId !== -1) {
    //   this.drinks.splice(toBeRemovedId, 1);
    // }
  }

  editDrink(drink: DrinkModel): void {
    this.idControl.setValue(drink.id);
    this.nameControl.setValue(drink.name);
    this.priceControl.setValue(drink.price);
  }
}
