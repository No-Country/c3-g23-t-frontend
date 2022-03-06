import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarServiceService {
  isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private userService: UserService) {}

  openSidebar() {
    this.isOpen.next(true);
  }
  closeSidebar() {
    this.isOpen.next(false);
  }
}
