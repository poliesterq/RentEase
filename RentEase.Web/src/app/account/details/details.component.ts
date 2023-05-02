import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/models/user';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { customValidators } from 'src/app/shared/helpers/custom-validation';
import { IdentityService } from 'src/app/shared/services/identity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private userService:UserService, 
    private identityService:IdentityService,
    private translate:TranslateService,
    private snackbar:MatSnackBar
    ) { }
    
  user:User;
  accountId = localStorage.getItem('id');
  role = localStorage.getItem('role');
  language = (localStorage.getItem("lang") || 'en') == 'en' ? 'English' : 'Українська';

  form: FormGroup = new FormGroup ({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-zА-ЯЄІа-яєі\']+")]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-zА-ЯЄІа-яєі\']+")]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[- +()0-9]+")]),
    password: new FormControl(null, [
      Validators.required, 
      Validators.pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@$!%^*#?&(){}]){6,}"))
    ]),
    passwordConfirmation: new FormControl(null, [Validators.required])
  },
  { validators: customValidators.passwordsMatching });

  hidePassword = true;

  ngOnInit(): void {
    this.getUser();

    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem("lang") || 'en'); 
  }

  getUser(){
    if (this.accountId) {
      this.userService.getById(this.accountId).subscribe( data =>
        this.user = data
      )};
  }

  edit():void{
    if(this.form.valid) {
      let user:User = <User> {
        id: this.accountId,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value,
        password: this.password.value,
        birthDate: this.user.birthDate
      };

      this.identityService.edit(user).pipe(
        tap(() => {
          this.getUser();
        })).subscribe();
    }
    else {
      this.snackbar.open('Please fill out all nedded information', 'Close',
      {duration: 1500, horizontalPosition: 'right', verticalPosition: 'top'});
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

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.errors?.['pattern'] 
      ? 'Must be at least 6 characters and contain letter, number, special symbol' : '';
  }

  getPhoneNumberErrorMessage(){
    return this.phoneNumber.errors?.['pattern'] ? 'Not a valid phone number' : '';
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

  get phoneNumber():FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }

  get password():FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirmation():FormControl {
    return this.form.get('passwordConfirmation') as FormControl;
  }
}