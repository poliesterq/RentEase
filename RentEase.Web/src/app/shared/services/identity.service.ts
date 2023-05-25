import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user'
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationResult } from '../models/authentication-result';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  readonly baseUrl = environment.baseUrl + 'Identity';
  helper = new JwtHelperService();

  login(user:User) : Observable<AuthenticationResult> {
    return this.http.post<AuthenticationResult>(`${this.baseUrl}/Login`, user).pipe(
      tap((result: AuthenticationResult) => {
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('id', this.helper.decodeToken(result.token)['id']);
        localStorage.setItem('role', this.helper.decodeToken(result.token)['role']);
      }),
      tap(() => this.snackbar.open('Successful login', 'Close',
      {duration: 1500, horizontalPosition: 'right', verticalPosition: 'top'})),
      catchError(error => {
        this.snackbar.open(`${error.error.errors}`, 'Close',
        {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'});
        return throwError(error);
      })
      );
  }

  registration(user:User) : Observable<AuthenticationResult> {
    return this.http.post<AuthenticationResult>(`${this.baseUrl}/Registration`, user).pipe(
      tap((result: AuthenticationResult) => {
        localStorage.setItem('access_token', result.token);
        localStorage.setItem('id', this.helper.decodeToken(result.token)['id']);
        localStorage.setItem('role', this.helper.decodeToken(result.token)['role']);
      }),
      tap(() => this.snackbar.open('Successful registration', 'Close',
      {duration: 1500, horizontalPosition: 'right', verticalPosition: 'top'})),
      catchError(error => {
        this.snackbar.open(`${error.error.errors}`, 'Close',
        {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'});
        return throwError(error);
      }));
  }

  edit(user:User) : Observable<AuthenticationResult> {
    return this.http.put<AuthenticationResult>(`${this.baseUrl}/Update`, user).pipe(
      tap(() => this.snackbar.open('Successful edit', 'Close',
      {duration: 1500, horizontalPosition: 'right', verticalPosition: 'top'})),
      catchError(error => {
        this.snackbar.open(`${error.error.errors}`, 'Close',
        {duration: 5000, horizontalPosition: 'right', verticalPosition: 'top'});
        return throwError(error);
      }));
  }
}