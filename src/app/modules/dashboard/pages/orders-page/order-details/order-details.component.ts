import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faShippingFast, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderStatusEnum } from '@api/http';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { OrderService } from '@service';
import { OrderRO } from '@ro';
import { UpdateOrderDto } from '@dto';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, FontAwesomeModule],
})
export class OrderDetailsComponent implements OnInit {
  faShippingFast = faShippingFast;
  faTimes = faTimes;
  id: string;
  constructor(
    private readonly orderService: OrderService,
    private readonly activateRoute: ActivatedRoute,
    private readonly toast: ToastrCustomService,
  ) {}
  order: OrderRO;

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id')!;
    this.orderService.getOrder$(this.id).subscribe({
      next: (response) => {
        this.order = response;
      },
    });
  }

  onShippingIconShow() {
    return this.order.status === OrderStatusEnum.PROCESSING;
  }

  onShippingClick() {
    const dto: UpdateOrderDto = {
      status: OrderStatusEnum.SHIPPING,
    };
    this.orderService.updateOrder$(this.id, dto).subscribe({
      next: (response) => {
        this.order = {
          ...this.order,
          status: response.status as OrderStatusEnum,
        };
      },
      complete: () => {
        this.toast.success('Shipping status updated');
      },
    });
  }

  onCancelClick() {
    this.orderService
      .updateOrder$(this.id, { status: OrderStatusEnum.CANCELED })
      .subscribe({
        next: (response) => {
          this.order = {
            ...this.order,
            status: response.status as OrderStatusEnum,
          };
        },
        complete: () => {
          this.toast.success('Canceled status updated');
        },
      });
  }
}
