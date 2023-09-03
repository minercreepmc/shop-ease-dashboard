import { Component } from '@angular/core';
import { UsersHomeComponent } from './users-home/users-home.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  standalone: true,
  imports: [UsersHomeComponent],
})
export class UsersPageComponent {}
