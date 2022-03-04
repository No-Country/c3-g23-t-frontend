import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../_service/login-custom.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.loginService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;

    const isApiUrl = request.url.startsWith('http://localhost:8080');
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: currentUser.token,
        },
      });
    }
    return next.handle(request);
  }
}
