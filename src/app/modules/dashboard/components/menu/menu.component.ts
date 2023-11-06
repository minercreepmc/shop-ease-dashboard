import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { UserRole } from '@constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBoxOpen,
  faList,
  faUser,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
})
export class MenuComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  faBoxOpen = faBoxOpen;
  faList = faList;
  faUser = faUser;
  faTag = faTag;
  role: string;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.role = data.profile.role;
    });
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  isStaff() {
    return this.role === UserRole.STAFF;
  }

  isShipper() {
    return this.role === UserRole.SHIPPER;
  }
}
