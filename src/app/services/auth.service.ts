import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: UserModel | undefined = undefined;
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  login(email: string, password: string): Observable<boolean>{
    return this.http.post<UserModel>(this.config.apiUrl + '/auth/login', {email, password}).pipe(
      map((response: UserModel) =>{
        this.loggedInUser = response;
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        return true;
      })
    );
  }

  logout(){
    this.loggedInUser = undefined;
    localStorage.removeItem('loggedInUser');
    this.http.post(this.config.apiUrl + '/auth/logout', {}).subscribe();
  }

  checkUser(){
    const user = localStorage.getItem('loggedInUser');
    if(user){
      const header: HttpHeaders = new HttpHeaders().set('Authorization', `${JSON.parse(user).token}`);
      this.http.get<UserModel>(this.config.apiUrl + '/auth', {headers: header}).subscribe({
        next: (response) =>{
          this.loggedInUser = response;
          localStorage.setItem('loggedInUser', JSON.stringify(response));
        },
        error: (error) =>{
          localStorage.removeItem('user');
          this.loggedInUser = undefined;
        }
      });
    }
  }
}
