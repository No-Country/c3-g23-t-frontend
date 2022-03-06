import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './_model/login';
import { LoginService } from './_service/login-custom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'c3-g23-t-frontend';
}
