import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateDiscountDto } from '@dto';
import { DiscountService } from '@service';

@Component({
  selector: 'app-discounts-form',
  templateUrl: './discounts-form.component.html',
  styleUrls: ['./discounts-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DiscountsFormComponent {
  constructor(private readonly discountService: DiscountService) {}
  discountForm: FormGroup;
  createDiscountDto: CreateDiscountDto;

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  onDiscountSubmit() {
    this.discountService.createDiscount$(this.createDiscountDto).subscribe();
  }
}
