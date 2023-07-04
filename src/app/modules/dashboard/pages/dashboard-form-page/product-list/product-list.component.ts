import { Component } from '@angular/core';
import { Product } from './product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'Capucino',
      image: 'http://example.com/image1.jpg',
      price: {
        amount: 12,
        currency: 'USD',
      },
      stock: 12,
      categories: ['Milk Coffee'],
    },
    {
      id: '2',
      name: 'Americano',
      image: 'http://example.com/image2.jpg',
      price: {
        amount: 10,
        currency: 'USD',
      },
      stock: 20,
      categories: ['Black Coffee'],
    },
    {
      id: '3',
      name: 'Latte',
      image: 'http://example.com/image3.jpg',
      price: {
        amount: 15,
        currency: 'USD',
      },
      stock: 5,
      categories: ['Milk Coffee'],
    },
  ];
  selectedProducts: boolean[] = Array(this.products.length).fill(false);
}
