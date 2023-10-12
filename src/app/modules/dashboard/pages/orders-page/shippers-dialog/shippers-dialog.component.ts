import { NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateShippingDto } from '@dto';
import { UserModel } from '@model';
import { WhiteFormComponent } from '@modules/dashboard/components/white-form/white-form.component';
import { ShippingService, UserService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

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
  ],
})
export class ShippersDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public orderId: string,
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
    this.createShippingDto.orderId = this.orderId;
    console.log(this.createShippingDto);
  }

  createShipping(dto: CreateShippingDto) {
    console.log(dto);
    // this.shippingService.create$(this.createShippingDto).subscribe({
    //   next: () => {
    //     this.toast.success('Create successfully');
    //   },
    //   error: (e) => {
    //     e.error.message.forEach((m: any) => {
    //       this.toast.error(m.error);
    //     });
    //
    //     console.log(e);
    //   },
    //   complete: () => {
    //     this.dialogRef.close();
    //   },
    // });
  }
}
