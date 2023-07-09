import { Component } from '@angular/core';
import {
  faBoxOpen,
  faList,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  faBoxOpen = faBoxOpen;
  faList = faList;
  faUserCheck = faUserCheck;
}
