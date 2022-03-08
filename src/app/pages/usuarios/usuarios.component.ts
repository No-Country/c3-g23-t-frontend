import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';

import { environment } from 'src/environments/environment';
//import {jwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  myUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMyInfo().subscribe({
      next: (response) => {
        this.myUser = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
