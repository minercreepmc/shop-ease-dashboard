import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { UpdateShippingFeeDto } from '@dto';
import { ShippingFeeModel } from '@model';
import { ShippingFeeService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-shipping-fee-details',
  templateUrl: './shipping-fee-details.component.html',
  styleUrls: ['./shipping-fee-details.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ShippingFeeDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shippingFeeService: ShippingFeeService,
    private toast: ToastrCustomService,
  ) {}
  updateShippingFeeDto = new UpdateShippingFeeDto();
  shippingFee: ShippingFeeModel;

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.shippingFee = data.fee;
    });
  }

  onNameChange($event: any) {
    this.updateShippingFeeDto.name = $event.target.value;
  }

  onFeeChange($event: any) {
    this.updateShippingFeeDto.fee = $event.target.value;
  }

  onSubmit() {
    this.shippingFeeService
      .updateFee$(this.shippingFee.id, this.updateShippingFeeDto)
      .subscribe({
        next: () => {
          this.toast.success('Cập nhật phí thành công');
        },
        error: (e: HttpErrorResponse) => {
          e.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });

          console.log(e);
        },
        complete: () => {
          this.updateShippingFeeDto = new UpdateShippingFeeDto();
        },
      });
  }
}
