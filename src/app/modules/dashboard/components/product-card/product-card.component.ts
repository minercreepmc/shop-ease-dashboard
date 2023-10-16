import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { numberFormat, UserRole } from '@constant';
import { ProductRO } from '@ro';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    DecimalPipe,
    RouterLink,
    NgIf,
    NgClass,
  ],
})
export class ProductCardComponent {
  @Input() product!: ProductRO;
  @Input() role: string;
  numberFormat = numberFormat;

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  @Output() deleteClicked = new EventEmitter<string>();
  onDeleteClick(id: string) {
    this.deleteClicked.emit(id);
  }
}
