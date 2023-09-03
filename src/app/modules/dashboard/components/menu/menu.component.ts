import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBoxOpen,
  faList,
  faUser,
  faTag,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
})
export class MenuComponent {
  faBoxOpen = faBoxOpen;
  faList = faList;
  faUser = faUser;
  faTag = faTag;
}
