import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../_model/login';
import { LoginService } from './login-custom.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: Login;
  isAdmin: boolean;
  currentEmail: string;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.currentUser.subscribe((x) => (this.currentUser = x));

    if (this.currentUser != null) {
      this.isAuthenticated.next(true);
      if (this.currentUser.roleName[0].authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      this.currentEmail = this.currentUser.email;
    }
  }

  // Logout:
  logout() {
    this.isAuthenticated.next(false);
    this.loginService.logout();
  }

  


}
