import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../enums/role.enum';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  readonly baseUrl = environment.baseUrl + 'User';

  getById(id:string) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  delete(id:string) : Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }

  getAll(roles?:Role[]):Observable<User[]>{    
    let httpParams = new HttpParams();

    if(roles !== undefined){
      httpParams = new HttpParams({ 
        fromObject: { 'roles': roles } 
     });
    }

    return this.http.get<User[]>(this.baseUrl, {params: httpParams});
  }
}
