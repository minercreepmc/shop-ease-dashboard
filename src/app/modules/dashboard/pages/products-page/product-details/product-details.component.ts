import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { numberFormat } from '@constant';
import { UpdateProductDto } from '@dto';
import { ProductSliderComponent } from '@modules/dashboard/components/product-slider/product-slider.component';
import { ProductRO } from '@ro';
import { ProductService } from '@service';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    ProductSliderComponent,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrCustomModule,
    MatDialogModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productSerivce: ProductService,
    private toast: ToastrCustomService,
  ) {}
  product: ProductRO;
  updateProductDto: UpdateProductDto;
  numberFormat = numberFormat;

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.updateProductDto = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
    };
  }

  onSubmit() {
    this.updateProductDto.price = Number(this.updateProductDto.price);
    this.updateProduct(this.product.id, this.updateProductDto);
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    this.productSerivce.updateProduct$(this.product.id, dto).subscribe({
      next: () => {
        this.toast.success('Update product successfully');
      },
      error: (e) => {
        console.log(e);
      },
    });
    console.log(this.updateProductDto);
  }
}
