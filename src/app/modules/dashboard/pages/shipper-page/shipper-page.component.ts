import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserModel } from '@model';
import { UserListComponent } from '@modules/dashboard/components/user-list/user-list.component';
import { UserService } from '@service';
import { ShipperFormComponent } from './shipper-form/shipper-form.component';

@Component({
  selector: 'app-shipper-page',
  templateUrl: './shipper-page.component.html',
  styleUrls: ['./shipper-page.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, UserListComponent],
})
export class ShipperPageComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}
  shippers: UserModel[] = [];
  ngOnInit(): void {
    this.userService.users$.subscribe({
      next: (shippers) => {
        this.shippers = shippers;
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShipperFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
