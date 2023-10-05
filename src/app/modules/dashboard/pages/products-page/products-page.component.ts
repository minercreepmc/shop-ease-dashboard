import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service';
import { ProductListComponent } from '@modules/dashboard/components/product-list/product-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProductListComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatDialogModule,
  ],
})
export class ProductsPageComponent {
  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
