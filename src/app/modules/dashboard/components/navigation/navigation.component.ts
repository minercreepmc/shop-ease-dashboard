import { Component } from '@angular/core';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  faSearch = faSearch;
  faBell = faBell;
  faBars = faBars;
}
