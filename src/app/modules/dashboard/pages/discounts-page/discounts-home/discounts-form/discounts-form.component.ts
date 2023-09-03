import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CreateDiscountHttpRequest,
  DiscountService,
} from '@shared/services/discount';

@Component({
  selector: 'app-discounts-form',
  templateUrl: './discounts-form.component.html',
  styleUrls: ['./discounts-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class DiscountsFormComponent implements OnInit {
  discountForm: FormGroup;

  ngOnInit() {
    this.discountForm = this.fb.group({
      name: '',
      percentage: '',
      description: '',
    });
  }

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  onDiscountSubmit() {
    const dto = this.discountForm.value;
    this.createDiscount(dto);
    this.discountForm.reset();
  }

  createDiscount(dto: CreateDiscountHttpRequest) {
    console.log(dto);
    this.discountService.createDiscount$(dto).subscribe();
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly discountService: DiscountService
  ) {}
}
