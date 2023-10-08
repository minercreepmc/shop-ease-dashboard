import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserRO } from '@ro';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [NgFor],
})
export class UserListComponent {
  @Input() users: UserRO[] = [];
}
