import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from 'src/app/_service/products.service';
import { SidebarServiceService } from 'src/app/_service/sidebar-service.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-layout-custom',
  templateUrl: './layout-custom.component.html',
  styleUrls: ['./layout-custom.component.scss'],
})
export class LayoutCustomComponent implements OnInit {
  myError: number = 200;
  currentYear: number = new Date().getFullYear();
  sidebarToggle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthenticated: BehaviorSubject<boolean>;

  // Filters
  selectedName: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sidebarService: SidebarServiceService,
    private productsService: ProductsService
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
    this.router.navigateByUrl('/');
  }
  fireRedirect() {}
}
