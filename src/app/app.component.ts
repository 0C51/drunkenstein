import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { BartenderService } from './bartender.service';
import { DrinkModel } from './interfaces';
import { getDrinksAction } from './ngrx/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drunkenstein';
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

  constructor(
    private _bartenderService: BartenderService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._store.dispatch(getDrinksAction());
    this._bartenderService.getDrinks().subscribe(
      (drinks) =>
        (this.drinks = drinks.map((drink: DrinkModel) => {
          drink.price = drink.price ?? drink.name.length ?? 0;
          return drink;
        }))
    );
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
