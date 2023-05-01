import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { customValidators } from 'src/app/shared/helpers/custom-validation';
import { IdentityService } from 'src/app/shared/services/identity.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private identityService:IdentityService, 
    private translate:TranslateService,
    private router:Router,
    private snackbar:MatSnackBar) { }

    hidePassword = true;
    language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

    form: FormGroup = new FormGroup ({
      firstName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-zА-ЯЄІа-яєі\']+")]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-zА-ЯЄІа-яєі\']+")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.pattern("^[- +()0-9]+")]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@$!%^*#?&(){}]){6,}"))
      ]),
      passwordConfirmation: new FormControl(null, [Validators.required])
    },
    { validators: customValidators.passwordsMatching });

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en');  
  }
  
  registration():void {
    if(this.form.valid) {
      let user:User = <User> {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        role: this.role.value,
        password: this.password.value
      };

      this.identityService.registration(user).pipe(
        tap(() => {
          this.router.navigate(['account/details'])
          .then(() => window.location.reload())
        })).subscribe();
    }
    else{
      this.snackbar.open('Please fill out all nedded information', 'Close',
      {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    }
  }

  getFirstNameErrorMessage(){
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.firstName.hasError('maxlength')){
      return 'Maximum size exceeded';
    }

    return this.firstName.hasError('pattern') ? 'Not a valid first name, must have only letters' : '';
  }

  getLastNameErrorMessage(){
    if (this.lastName.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.lastName.hasError('maxlength') ) {
      return 'Maximum size exceeded';
    }

    return this.lastName.hasError('pattern') ? 'Not a valid last name, must have only letters' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneNumberErrorMessage(){
    return this.phoneNumber.errors?.['pattern'] ? 'Not a valid phone number' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.errors?.['pattern'] 
      ? 'Must be at least 6 characters and contain letter, number, special symbol' : '';
  }

  getPasswordConfirmationErrorMessage() {
    return this.password.hasError('required')
      ? 'You must enter a value' : '';
  }

  get firstName():FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastName():FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get email():FormControl {
    return this.form.get('email') as FormControl;
  }

  get phoneNumber():FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }
  
  get role():FormControl {
    return this.form.get('role') as FormControl;
  }

  get password():FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirmation():FormControl {
    return this.form.get('passwordConfirmation') as FormControl;
  }
}