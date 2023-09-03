import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpCustomException } from '@api/http';
import {
  CreateDiscountHttpRequest,
  CreateDiscountHttpResponse,
  DiscountModel,
  DiscountService,
} from '@shared/services/discount';
import { Observable } from 'rxjs';
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
  discounts$: Observable<DiscountModel[]>;
  discountForm: FormGroup;
  selectedDiscountIds: string[] = [];
  isSelecting = false;

  ngOnInit(): void {
    this.discountForm = this.formBuilder.group({
      name: '',
    });
    this.discountService.loadDiscounts$().subscribe();
    this.discounts$ = this.discountService.discounts$;
  }

  createDiscount(dto: CreateDiscountHttpRequest) {
    this.discountService.createDiscount$(dto).subscribe({
      next: (response: CreateDiscountHttpResponse) => {
        console.log(response);
      },
      error: (exception: HttpCustomException) => {
        throw exception;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  removeDiscounts() {
    //
  }

  toggleSelection(event: MouseEvent, id: string) {
    event.stopPropagation();
    const index = this.selectedDiscountIds.indexOf(id);

    if (index === -1) {
      // Not currently selected, add to selection
      this.selectedDiscountIds.push(id);
    } else {
      // Currently selected, remove from selection
      this.selectedDiscountIds.splice(index, 1);
    }
  }

  toggleSelectMode() {
    this.isSelecting = !this.isSelecting;

    if (this.isSelecting) {
      this.selectedDiscountIds = [];
    }
  }

  deselectAll() {
    this.selectedDiscountIds = [];
  }

  onSubmit() {
    const dto = this.discountForm.value;
    this.createDiscount(dto);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly discountService: DiscountService
  ) {}
}
