import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUsers,
  faUserEdit,
  faEnvelope,
  faGear,
  faCircleInfo,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@shared/services/auth';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent {
  faUsers = faUsers;
  faUserEdit = faUserEdit;
  faMail = faEnvelope;
  faGear = faGear;
  faCircleInfo = faCircleInfo;
  faRightFromBracket = faRightFromBracket;
  isMenuOpen = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
