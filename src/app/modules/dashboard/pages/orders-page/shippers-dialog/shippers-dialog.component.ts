import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CreateShippingDto } from '@dto';
import { UserModel } from '@model';
import { WhiteFormComponent } from '@modules/dashboard/components/white-form/white-form.component';
import { ShippingService, UserService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { OrderStatus } from '@constant';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shippers-dialog',
  templateUrl: './shippers-dialog.component.html',
  styleUrls: ['./shippers-dialog.component.scss'],
  standalone: true,
  imports: [
    WhiteFormComponent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatDatepickerModule,
    MatInputModule,
    RouterModule,
  ],
})
export class ShippersDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShippersDialogComponent>,
    private toast: ToastrCustomService,
    private userService: UserService,
    private shippingService: ShippingService,
  ) {}
  createShippingDto: CreateShippingDto;
  shippers: UserModel[];

  ngOnInit(): void {
    this.userService.users$.subscribe({
      next: (users: UserModel[]) => {
        this.shippers = users;
      },
    });
    this.createShippingDto = new CreateShippingDto();
    this.createShippingDto.orderId = this.data.order?.id;
  }

  createShipping($event: any) {
    const date = this.createShippingDto.dueDate;

    this.createShippingDto.dueDate = new Date(date).toISOString();

    this.shippingService.create$(this.createShippingDto).subscribe({
      next: () => {
        this.toast.success('Create successfully');
      },
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });

        console.log(e);
      },
      complete: () => {
        this.dialogRef.close(true);
      },
    });
  }
}
