import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { ProductModel } from '@model';
import { ProductService } from '@service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    ProductCardComponent,
    AsyncPipe,
    NgFor,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    ToastrCustomModule,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog,
    private readonly toast: ToastrCustomService,
  ) {}
  products: ProductModel[] = [];

  ngOnInit() {
    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }

  deleteProduct(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct$(id).subscribe({
          next: () => {
            this.toast.success('Delete product successfully');
          },
        });
      }
    });
  }
}
