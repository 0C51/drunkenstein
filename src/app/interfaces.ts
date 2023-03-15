export interface DrinkModel {
  address_2?: string;
  address_3?: string;
  brewery_type?: string;
  city?: string;
  country?: string;
  county_province?: string;
  created_at?: string;
  id: string;
  latitude?: string;
  longitude?: string;
  name: string;
  phone?: string;
  postal_code?: string;
  state?: string;
  street?: string;
  updated_at?: string;
  website_url?: string;
  price?: number;
}

export interface StoreState {
  isLoading: boolean;
  drinks: DrinkModel[];
  loadSuccess: boolean | null;
  loadError: boolean | null;
}

export enum ActionType {
  getDrinks = '[App] Get Drinks',
}
