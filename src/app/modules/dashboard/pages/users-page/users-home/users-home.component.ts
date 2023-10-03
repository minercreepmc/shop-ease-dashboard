import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserModel } from '@model';
import { AuthService } from '@service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
})
export class UsersHomeComponent {
  constructor(private readonly authService: AuthService) {}
  users: UserModel[] = [];
}
