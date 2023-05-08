import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/shared/enums/category.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import { Order } from 'src/app/shared/models/order';
import { OrderSearchParameters } from 'src/app/shared/models/order-search-parameters';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private translate: TranslateService
  ) {}

  Category = Category;
  Role = Role;
  confirmed: boolean[] = [true, false];
  selectedTab: number = 0;

  language = localStorage.getItem('lang') || 'en';
  role = localStorage.getItem('role');
  userId = localStorage.getItem('id');

  outgoingOrders: Order[];
  incomingOrders: Order[];

  searchParameters: OrderSearchParameters = new OrderSearchParameters();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl(null),
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
    isConfirmed: new FormControl(null),
  });

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');

    this.getAll();
  }

  getAll(): void {
    console.log(this.selectedTab);
    if (this.selectedTab === 0) {
      this.searchParameters.tenantId = this.userId ? this.userId : undefined;
      this.searchParameters.landlordId = undefined;

      this.orderService
        .getAllByParams(this.searchParameters)
        .subscribe((data) => {
          this.outgoingOrders = data;
        });
    } else {
      this.searchParameters.landlordId = this.userId ? this.userId : undefined;
      this.searchParameters.tenantId = undefined;
     
      this.orderService
        .getAllByParams(this.searchParameters)
        .subscribe((data) => {
          this.incomingOrders = data;
          console.log(this.incomingOrders);
        });
    }
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.index;
    this.getAll();
  }

  filter(): void {
    if (this.search.value) {
      this.searchParameters.searchParameter = this.search.value;
    }

    if (this.dateFrom.value) {
      this.searchParameters.dateFrom = this.dateFrom.value;
    }

    if (this.dateTo.value) {
      this.searchParameters.dateTo = this.dateTo.value;
    }

    this.searchParameters.isConfirmed = this.isConfirmed.value;

    this.getAll();
  }

  get search(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  get dateFrom(): FormControl {
    return this.filterForm.get('dateFrom') as FormControl;
  }

  get dateTo(): FormControl {
    return this.filterForm.get('dateTo') as FormControl;
  }

  get isConfirmed(): FormControl {
    return this.filterForm.get('isConfirmed') as FormControl;
  }
}
