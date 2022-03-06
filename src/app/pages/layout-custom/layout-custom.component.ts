import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/_service/login-custom.service';
import { SidebarServiceService } from 'src/app/_service/sidebar-service.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-layout-custom',
  templateUrl: './layout-custom.component.html',
  styleUrls: ['./layout-custom.component.scss'],
})
export class LayoutCustomComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  sidebarToggle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthenticated: BehaviorSubject<boolean>;

  constructor(
    private userService: UserService,
    private router: Router,
    private sidebarService: SidebarServiceService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.sidebarToggle = this.sidebarService.isOpen;
  }

  openSidebar() {
    this.sidebarService.openSidebar();
    this.sidebarToggle = this.sidebarService.isOpen;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/pages/usuarios');
  }
}
