import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from '@constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@service';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, UserDropdownComponent, NgIf],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService) {}
  faSearch = faSearch;
  faBell = faBell;
  faBars = faBars;

  role: string;

  ngOnInit(): void {
    this.authService.profile$.subscribe({
      next: (profile) => {
        this.role = profile.role;
      },
    });
  }

  isShipper() {
    return this.role === UserRole.SHIPPER;
  }
}
