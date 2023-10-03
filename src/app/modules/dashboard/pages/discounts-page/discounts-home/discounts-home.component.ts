import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCustomException } from '@api/http';
import { CreateDiscountDto } from '@dto';
import { DiscountModel } from '@model';
import { DiscountService } from '@service';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountsFormComponent } from './discounts-form/discounts-form.component';

@Component({
  selector: 'app-discounts-home',
  templateUrl: './discounts-home.component.html',
  styleUrls: ['./discounts-home.component.scss'],
  standalone: true,
  imports: [NgIf, DiscountsFormComponent, DiscountListComponent, AsyncPipe],
})
export class DiscountsHomeComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute) {}
  discounts: DiscountModel[] = [];
  createDiscountDto: CreateDiscountDto;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.discounts = data.discounts;
    });
  }
}
