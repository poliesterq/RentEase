import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';
import { OrderSearchParameters } from '../models/order-search-parameters';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  readonly baseUrl = environment.baseUrl + 'Order';
  
  getAll(): Observable<Order[]> {
    let searchParameter:OrderSearchParameters = new OrderSearchParameters();

    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['searchParameter']) {
        searchParameter.searchParameter = queryParams['searchParameter'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
        if (!!queryParams['dateFrom']) {
            searchParameter.dateFrom = queryParams['dateFrom'];
        }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['dateTo']) {
        searchParameter.dateTo = queryParams['dateTo'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['isConfirmed']) {
        searchParameter.isConfirmed = queryParams['isConfirmed'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['itemId']) {
        searchParameter.itemId = queryParams['itemId'];
      }
    });
    this.route.queryParams.subscribe((queryParams) => {
      if (!!queryParams['tenantId']) {
        searchParameter.tenantId = queryParams['tenantId'];
      }
    });

    return this.http.post<Order[]>(`${this.baseUrl}/GetList`, searchParameter);
  }

  getAllByParams(searchParameter: OrderSearchParameters): Observable<Order[]> {
    return this.http.post<Order[]>(`${this.baseUrl}/GetList`, searchParameter);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  add(Order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/Create`, Order);
  }

  edit(Order: Order): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/Update`, Order);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  confirm(id: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/Confirm/${id}`, {});
  }
}
