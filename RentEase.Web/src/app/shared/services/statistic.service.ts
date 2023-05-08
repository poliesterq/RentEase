import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryStatistic } from '../models/category-statistic';
import { OrderStatistic } from '../models/order-statistic';
import { ExpenseStatistic } from '../models/expense-statistic';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  readonly baseUrl = environment.baseUrl + 'Statistic';

  getCategory(landlordId: string): Observable<CategoryStatistic[]> {
    return this.http.get<CategoryStatistic[]>(`${this.baseUrl}/Category/${landlordId}`);
  }

  getOrder(landlordId: string): Observable<OrderStatistic[]> {
    return this.http.get<OrderStatistic[]>(`${this.baseUrl}/Order/${landlordId}`);
  }

  getExpense(tenantId: string): Observable<ExpenseStatistic[]> {
    return this.http.get<ExpenseStatistic[]>(`${this.baseUrl}/Expense/${tenantId}`);
  }
}
