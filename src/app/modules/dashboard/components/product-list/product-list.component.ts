import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductRO, ProductWithImagesRO } from '@ro';
import { numberFormat, UserRole } from '@constant';

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
    NgIf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    ToastrCustomModule,
    DecimalPipe,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toast: ToastrCustomService,
  ) {}
  @Input() products: ProductRO[];
  role: string;

  numberFormat = numberFormat;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.role = data.profile.role;
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
            this.toast.success('Xóa thành công');
          },
        });
      }
    });
  }
}
