import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidebarServiceService } from 'src/app/_service/sidebar-service.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean;
  sidebarToggle: BehaviorSubject<boolean> = this.sidebarService.isOpen;
  loggedUser: string = this.userService.currentEmail;

  constructor(
    private userService: UserService,
    private sidebarService: SidebarServiceService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin;
  }

  closeSidebar() {
    this.sidebarService.closeSidebar();
    this.sidebarToggle = this.sidebarService.isOpen;
  }
}
