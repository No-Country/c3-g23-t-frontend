import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../_model/login';
import { LoginService } from './login-custom.service';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:8080/user';

  currentUser: Login;
  isAdmin: boolean;
  currentEmail: string;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {
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

  // === USER ===

  getMyInfo() {
    return this.httpClient.get<User>(`${this.userUrl}/me`);
  }

  editMyInfo(myId: number) {
    console.log('Editras my Info: ' + myId);
  }
}
