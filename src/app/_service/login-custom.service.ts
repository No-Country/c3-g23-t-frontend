import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, retry } from 'rxjs';
import { Login } from '../_model/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = `http://localhost:8080/auth/login`;
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Login>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // GetCurrentUser:
  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  // Login:
  login(formValues: FormGroup) {
    return this.httpClient.post<any>(this.url, formValues).pipe(
      retry(1),
      map((user) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  // Logout:
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
