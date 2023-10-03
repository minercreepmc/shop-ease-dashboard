import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faCoffee,
  faDollarSign,
  faShoppingCart,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-analytic-header',
  templateUrl: './analytic-header.component.html',
  styleUrls: ['./analytic-header.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule],
})
export class AnalyticHeaderComponent {
  faUsers = faUsers;
  faShoppingCart = faShoppingCart;
  faCoffee = faCoffee;
  faDollarSign = faDollarSign;
}
