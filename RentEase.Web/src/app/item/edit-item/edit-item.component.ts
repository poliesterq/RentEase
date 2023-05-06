import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Item } from 'src/app/shared/models/item';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private itemService:ItemService,
    private snackbar:MatSnackBar,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private translate:TranslateService
    ) {}
    
  language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';
  userId = localStorage.getItem("id");

  itemId: number;
  item:Item;

  Category = Category;
  categories:Category[] = [Category.Fashion, Category.Electronic, Category.Toy, 
    Category.Hobby, Category.Beauty, Category.Health, Category.Sport, Category.Household, 
    Category.Furniture, Category.Transport, Category.Travel, Category.Work];
  
  firstFormGroup = this._formBuilder.group({
    title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(null, [ Validators.required, Validators.maxLength(500)])
  });
  secondFormGroup = this._formBuilder.group({
    category: new FormControl(null, [Validators.required])
  });
  thirdFormGroup = this._formBuilder.group({
    priceUS: new FormControl(null, [Validators.required, Validators.min(1)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    imageUrl: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en'); 

    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.itemId = params['id'];
    });

    this.itemService.getById(this.itemId).subscribe(item => {
      this.item = item;
      this.category.setValue(item.category);
    });
  }

  create():void {
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      let item:Item = <Item> {
        id: this.item.id,
        title: this.title.value,
        description: this.description.value,
        category: this.category.value,
        priceUS: this.priceUS.value,
        address: this.address.value,
        imageUrl: this.imageUrl.value,
        landlordId: this.userId,
        isAvaiable: true
      };

      console.log(item);
      this.itemService.edit(item).pipe(
        tap(() => {
          this.router.navigate(['/item/:id'], { queryParams: { id: item.id}});
          this.snackbar.open('Item was edited succesfuly', 'Close',
          {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        })).subscribe();
    }
    else{
      this.snackbar.open('Please fill out all nedded information', 'Close',
      {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  }

  getTitleErrorMessage(): string {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
  }

    return this.title.hasError('maxlength') ? 'Maximum size exceeded' : '';
  }
  
  getDescriptionErrorMessage(): string {
    if (this.description.hasError('required')) {
      return 'You must enter a value';
    }

    return this.description.hasError('maxlength') ? 'Maximum size exceeded' : '';
  }

  
  getAddressErrorMessage(): string {
    if (this.address.hasError('required')) {
      return 'You must enter a value';
    }

    return this.address.hasError('maxlength') ? 'Maximum size exceeded' : '';
  }
  
  getImageErrorMessage(): string {
    return this.imageUrl.hasError('required') ? 'You must enter a value' : '';
  }

  getPriceErrorMessage(): string {
    if (this.priceUS.hasError('required')) {
      return 'You must enter a value';
    }

    return this.priceUS.hasError('min') ? 'You must enter value that greater than 0' : '';
  }

  get title():FormControl {
    return this.firstFormGroup.get('title') as FormControl;
  }

  get description():FormControl {
    return this.firstFormGroup.get('description') as FormControl;
  }

  get category():FormControl {
    return this.secondFormGroup.get('category') as FormControl;
  }

  get priceUS():FormControl {
    return this.thirdFormGroup.get('priceUS') as FormControl;
  }
  
  get address():FormControl {
    return this.thirdFormGroup.get('address') as FormControl;
  }

  get imageUrl():FormControl {
    return this.thirdFormGroup.get('imageUrl') as FormControl;
  }
}
