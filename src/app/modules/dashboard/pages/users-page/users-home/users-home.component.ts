import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, UserModel } from '@shared/services/auth';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
})
export class UsersHomeComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  $users: Observable<UserModel[]>;

  ngOnInit() {
    this.$users = this.authService
      .getUsers$()
      .pipe(map((users) => users.users));
  }
}
