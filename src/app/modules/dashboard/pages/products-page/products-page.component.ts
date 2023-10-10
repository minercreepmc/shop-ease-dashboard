import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@service';
import { ProductListComponent } from '@modules/dashboard/components/product-list/product-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductWithImagesRO } from '@ro';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '@model';
import { UserRole } from '@constant';

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
    MatToolbarModule,
  ],
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  products: ProductWithImagesRO[];
  userRole: string;

  ngOnInit(): void {
    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });
    this.route.data.subscribe((data) => {
      this.userRole = data.profile.role;
    });
  }

  isAdmin() {
    return this.userRole === UserRole.ADMIN;
  }

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
