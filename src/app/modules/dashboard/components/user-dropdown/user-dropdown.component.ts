import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faUserEdit,
  faEnvelope,
  faGear,
  faCircleInfo,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { UserModel } from '@model';
import { AuthService, StorageService } from '@service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgIf, AsyncPipe],
})
export class UserDropdownComponent implements OnInit {
  faUsers = faUsers;
  faUserEdit = faUserEdit;
  faMail = faEnvelope;
  faGear = faGear;
  faCircleInfo = faCircleInfo;
  faRightFromBracket = faRightFromBracket;
  isMenuOpen = false;

  user: UserModel | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.authService.getProfile$().subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  signOut() {
    this.authService.logOut$().subscribe({
      next: () => {
        this.storageService.clean();
      },
      error: (error) => {
        throw error;
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
