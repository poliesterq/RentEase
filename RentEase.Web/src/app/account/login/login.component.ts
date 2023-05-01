import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { IdentityService } from 'src/app/shared/services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private identityService:IdentityService,
    private translate:TranslateService,
    private snackbar:MatSnackBar) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hidePassword = true;
  language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en');  
  }
  
  login():void{
    if(this.email.valid && this.password.valid) {
      let user:User = <User> {
        email: this.email.value,
        password: this.password.value
      };

      this.identityService.login(user).pipe(
        tap(() => {
          this.router.navigate(['account/details'])
          .then(() => window.location.reload())
        })).subscribe();
    }
    else {
      this.snackbar.open('Please fill out all nedded information', 'Close',
      {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
}