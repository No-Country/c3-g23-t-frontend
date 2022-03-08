import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from 'src/app/_service/login-custom.service';
import { SidebarServiceService } from 'src/app/_service/sidebar-service.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  loggedUser: string;
  sidebarToggle: BehaviorSubject<boolean> = this.sidebarService.isOpen;

  constructor(
    private userService: UserService,
    private sidebarService: SidebarServiceService
  ) {}

  ngOnInit(): void {
    if (this.userService.currentUser != null) {
      this.loggedUser = this.userService.currentUser.email;
      if (this.userService.currentUser.roleName[0].authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
    this.sidebarToggle = this.sidebarService.isOpen;
  }
}
