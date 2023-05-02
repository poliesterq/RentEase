import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router,
    private jwtService:JwtHelperService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.jwtService.isTokenExpired()){
        localStorage.clear();
        window.location.reload();
        this.router.navigate(['']);
        return false;
      }

      let userRole = localStorage.getItem('role');

      if(route.data['roles'] && route.data['roles'].indexOf(userRole) === -1){
        this.router.navigate(['forbidden']);
        return false;
      }

      return true;
    }
}