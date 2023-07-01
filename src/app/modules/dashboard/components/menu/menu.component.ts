import { Component } from '@angular/core';
import {
  faChartPie,
  faThLarge,
  faUserEdit,
  faHamburger,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { faUikit, faCcVisa } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  faChartPie = faChartPie;
  faUikit = faUikit;
  faThLarge = faThLarge;
  faUserEdit = faUserEdit;
  faCcVisa = faCcVisa;
  faHamburger = faHamburger;
  faChartLine = faChartLine;
}
