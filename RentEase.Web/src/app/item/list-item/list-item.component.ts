import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Category } from 'src/app/shared/enums/category.enum';
import { Role } from 'src/app/shared/enums/role.enum';
import { Item } from 'src/app/shared/models/item';
import { ItemSearchParameters } from 'src/app/shared/models/item-search-parameters';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(private itemService:ItemService,
    private router:Router,
    private translate:TranslateService
  ) { }

  Category = Category;
  Role = Role;

  categoriesInit:Category[] = [Category.Fashion, Category.Electronic, Category.Toy, 
    Category.Hobby, Category.Beauty, Category.Health, Category.Sport, Category.Household, 
    Category.Furniture, Category.Transport, Category.Travel, Category.Work];

  language = localStorage.getItem("lang") || 'en';
  role = localStorage.getItem("role");
  userId = localStorage.getItem("id");
 

  allItems:Item[];
  items:Item[];
  pageEvent:any;

  filterForm: FormGroup = new FormGroup ({
    search: new FormControl(null),
    categories: new FormControl(null),
    address: new FormControl(null),
    priceMaxUS: new FormControl(null),
    priceMinUS: new FormControl(null),
    landlordId: new FormControl(null),
    isAvailable:  new FormControl(null)
  });
  
  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en'); 
    
    this.getAll();
  }

  onPaginateChange(data:any) {
    this.items =  this.allItems.slice(
      data.pageIndex*data.pageSize,
      data.pageIndex*data.pageSize + data.pageSize
      );
  }

  getAll() : void {
    this.itemService.getAll().subscribe(data => {
      this.allItems = data;
      this.items = this.allItems.slice(0, 4);
      console.log(this.items)
    });
  }

  filter(): void {
    let params:ItemSearchParameters = <ItemSearchParameters> {};

    if(this.search.value) {
      params.searchParameter = this.search.value;
    }
    if(this.categories.value) {
      params.categories = this.categories.value;
    }
    if(this.address.value) {
      params.address = this.address.value;
    }
    if(this.priceMinUS.value) {
      params.priceMinUS = this.priceMinUS.value;
    }
    if(this.priceMaxUS.value) {
      params.priceMaxUS = this.priceMaxUS.value;
    }
    if(this.landlordId.value) {
      params.landlordId = this.landlordId.value;
    }
    if(this.isAvailable.value) {
      params.isAvailable = this.isAvailable.value;
    }

    this.router.navigate(['/item'], { queryParams: params }).finally(
      () => this.getAll());
  }

  get search():FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  get categories():FormControl {
    return this.filterForm.get('categories') as FormControl;
  }

  get address():FormControl {
    return this.filterForm.get('address') as FormControl;
  }

  get priceMinUS():FormControl {
    return this.filterForm.get('priceMinUS') as FormControl;
  }

  get priceMaxUS():FormControl {
    return this.filterForm.get('priceMaxUS') as FormControl;
  }

  get landlordId():FormControl {
    return this.filterForm.get('landlordId') as FormControl;
  }

  get isAvailable():FormControl {
    return this.filterForm.get('isAvailable') as FormControl;
  }

  rangeValues: number[] = [300, 400];

}
