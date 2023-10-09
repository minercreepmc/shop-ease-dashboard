import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserListComponent } from '@modules/dashboard/components/user-list/user-list.component';
import { UserRO } from '@ro';
import { UserService } from '@service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, UserListComponent, MatButtonModule],
})
export class UsersPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  users: UserRO[];

  ngOnInit(): void {
    this.userService.users$.subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
