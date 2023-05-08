import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { Role } from 'src/app/shared/enums/role.enum';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService:UserService,
    private translate:TranslateService,
    private snackbar:MatSnackBar
    ) { }
  
  Role = Role;

  users:User[];
  applicants:User[];
  recruiters:User[];
  language = (localStorage.getItem('lang') || 'en') == 'en' ? 'English' : 'Українська';
  displayedColumns: string[] = ['number', 'firstName', 'lastName', 'email', 'phoneNumber', 'birthdate', 'interaction'];

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') || 'en');

    this.getAll();
  }

  getAll(): void{
    this.userService.getAll([Role.User]).subscribe(data => {
      this.users = data;
    });
  }

  delete(id:string): void {
    this.userService.delete(id).pipe(
      tap(() => {
        this.snackbar.open('User was deleted succesfuly', 'Close',
        {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        window.location.reload();
      })).subscribe();
  }
}
