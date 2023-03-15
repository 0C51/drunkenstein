import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DrinkModel } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class BartenderService {
  constructor(private http: HttpClient) {}

  getDrinks(): Observable<DrinkModel[]> {
    let params = new HttpParams().append('size', 10);
    return this.http.get<DrinkModel[]>(
      'https://api.openbrewerydb.org/breweries/random',
      {
        params,
      }
    );
  }
}
