import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBoxOpen,
  faList,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule],
})
export class MenuComponent {
  faBoxOpen = faBoxOpen;
  faList = faList;
  faPercent = faPercent;
}
