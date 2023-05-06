import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  readonly baseUrl = environment.baseUrl + 'Item';

  getAll(): Observable<Item[]> {
    let httpParams = new HttpParams();

    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['searchParameter']) {
        httpParams = httpParams.append(
          'SearchParameter',
          queryParams['searchParameter']
        );
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['categories']) {
        const categories = Array.isArray(queryParams['categories'])
          ? queryParams['categories']
          : [queryParams['categories']];
        const categoriesParam = categories.join('&');
        httpParams = httpParams.append('Categories', categoriesParam);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['address']) {
        httpParams = httpParams.append('Address', queryParams['address']);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['priceMinUS']) {
        httpParams = httpParams.append('PriceMinUS', queryParams['priceMinUS']);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['priceMaxUS']) {
        httpParams = httpParams.append('PriceMaxUS', queryParams['priceMaxUS']);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['landlordId']) {
        httpParams = httpParams.append('LandlordId', queryParams['landlordId']);
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['isAvailable']) {
        httpParams = httpParams.append(
          'IsAvailable',
          queryParams['isAvailable']
        );
      }
    });

    return this.http.get<Item[]>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }

  add(Item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, Item);
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
