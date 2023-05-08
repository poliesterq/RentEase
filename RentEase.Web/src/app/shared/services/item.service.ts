import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { ItemSearchParameters } from '../models/item-search-parameters';
import { Category } from '../enums/category.enum';

@Injectable({
  providedIn: 'root',
})

export class ItemService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  readonly baseUrl = environment.baseUrl + 'Item';
  Category = Category;

  categoryMapping: { [key: string]: Category } = {
    Fashion: Category.Fashion,
    Electronic: Category.Electronic,
    Toy: Category.Toy,
    Hobby: Category.Hobby,
    Beauty: Category.Beauty,
    Health: Category.Health,
    Sport: Category.Sport,
    Household: Category.Household,
    Furniture: Category.Furniture,
    Transport: Category.Transport,
    Travel: Category.Travel,
    Work: Category.Work,
  };
  
  getAll(): Observable<Item[]> {
    let searchParameter:ItemSearchParameters = new ItemSearchParameters();

    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['searchParameter']) {
        searchParameter.searchParameter = queryParams['searchParameter'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['categories']) {
        let categories = queryParams['categories'].map((value:number) => this.categoryMapping[value]);
        searchParameter.categories = categories;
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['address']) {
        searchParameter.address = queryParams['address'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['priceMinUS']) {
        searchParameter.priceMinUS = queryParams['priceMinUS'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['priceMaxUS']) {
        searchParameter.priceMaxUS = queryParams['priceMaxUS'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['landlordId']) {
        searchParameter.landlordId = queryParams['landlordId'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['isAvailable']) {
       searchParameter.isAvailable = queryParams['isAvailable'];
      }
    });

    return this.http.post<Item[]>(`${this.baseUrl}/GetList`, searchParameter);
  }

  getAllByParams(searchParameter: ItemSearchParameters): Observable<Item[]> {
    return this.http.post<Item[]>(`${this.baseUrl}/GetList`, searchParameter);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }

  add(Item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/Create`, Item);
  }

  edit(Item: Item): Observable<boolean> {
    return this.http.put<boolean>(this.baseUrl, Item);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  maxPriceUS(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/MaxPriceUS`);
  }
}
