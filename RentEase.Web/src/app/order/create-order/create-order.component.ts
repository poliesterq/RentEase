import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Item } from 'src/app/shared/models/item';
import { Order } from 'src/app/shared/models/order';
import { ItemService } from 'src/app/shared/services/item.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService,
    private snackbar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  language =
    (localStorage.getItem('lang') || 'en') == 'en' ? 'English' : 'Українська';
  userId = localStorage.getItem('id');

  Category = Category;
  categories: Category[] = [
    Category.Fashion,
    Category.Electronic,
    Category.Toy,
    Category.Hobby,
    Category.Beauty,
    Category.Health,
    Category.Sport,
    Category.Household,
    Category.Furniture,
    Category.Transport,
    Category.Travel,
    Category.Work,
  ];

  startDate = new Date(2000, 1, 1);

  item: Item;
  itemId: number;

  form: FormGroup = new FormGroup({
    dateFrom: new FormControl(null, [Validators.required]),
    dateTo: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');

    this.activatedRoute.queryParams.subscribe((params) => {
      this.itemId = params['itemId'];
    });

    this.itemService.getById(this.itemId).subscribe((item) => {
      this.item = item;
    });
  }

  create(): void {
    if (this.form.valid) {
      let Order: Order = <Order>{
        dateFrom: this.dateFrom.value,
        dateTo: this.dateTo.value,
        deliveryAddress: this.address.value,
        isConfirmed: false,
        itemId: this.itemId,
        tenantId: this.userId,
      };

      this.orderService
        .add(Order)
        .pipe(
          tap((result: Order) => {
            this.router.navigate(['/order/:id'], {
              queryParams: { id: result.id },
            });
            this.snackbar.open('Order was created succesfuly', 'Close', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          })
        )
        .subscribe();
    } else {
      this.snackbar.open('Please fill out all nedded information', 'Close', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  getAddressErrorMessage(): string {
    if (this.address.hasError('required')) {
      return 'You must enter a value';
    }

    return this.address.hasError('maxlength') ? 'Maximum size exceeded' : '';
  }

  getDateFromErrorMessage(): string {
    return this.dateFrom.hasError('required') ? 'You must enter a value' : '';
  }

  getDateToErrorMessage(): string {
    return this.dateTo.hasError('required') ? 'You must enter a value' : '';
  }

  get address(): FormControl {
    return this.form.get('address') as FormControl;
  }

  get dateFrom(): FormControl {
    return this.form.get('dateFrom') as FormControl;
  }

  get dateTo(): FormControl {
    return this.form.get('dateTo') as FormControl;
  }
}
