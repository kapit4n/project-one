import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  checkAuthenticated() {
    const authenticated = this.isLoggedIn;
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  signUp(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    return this.http.post<User>(`${BaseUrl}/users`, user);
  }

  signOut() {
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  setUserData(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}