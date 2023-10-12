import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserModel } from '@model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
})
export class UserListComponent {
  @Input() users: UserModel[] = [];
  @Input() detailRoute = 'users';
}
