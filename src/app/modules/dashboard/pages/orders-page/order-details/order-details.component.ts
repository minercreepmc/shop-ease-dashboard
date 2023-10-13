import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { OrderCardComponent } from '@modules/dashboard/components';
import { SkeletonComponent } from '@modules/dashboard/components/skeleton/skeleton.component';
import { OrderRO } from '@ro';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [
    SkeletonComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    OrderCardComponent,
  ],
})
export class OrderDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  order: OrderRO;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.order = data.order;
    });
  }
}
