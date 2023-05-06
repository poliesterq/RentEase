import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { Category } from 'src/app/shared/enums/category.enum';
import { Item } from 'src/app/shared/models/item';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  constructor(
    private itemService:ItemService,
    private snackbar:MatSnackBar,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private translate:TranslateService
  ) { }

  language = localStorage.getItem("lang") || 'en';
  role = localStorage.getItem("role");
  
  userId = localStorage.getItem("id");
  itemId: number;
  item:Item;

  Category = Category;
  
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
    });
  }

  delete(id: number): void {
    this.itemService.delete(id).pipe(
      tap(() => {
        this.snackbar.open('Item deleted succesfully', 'Close',
        {duration: 1500, horizontalPosition: 'right', verticalPosition: 'top'});
        this.router.navigate(['item']);
      })).subscribe();
  }

}
