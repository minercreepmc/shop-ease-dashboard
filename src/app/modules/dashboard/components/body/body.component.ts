import { Component } from '@angular/core';
import {
  faCoffee,
  faDollarSign,
  faShoppingCart,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  faUsers = faUsers;
  faShoppingCart = faShoppingCart;
  faCoffee = faCoffee;
  faDollarSign = faDollarSign;
}
