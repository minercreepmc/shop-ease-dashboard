import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, UserDropdownComponent],
})
export class NavigationComponent {
  faSearch = faSearch;
  faBell = faBell;
  faBars = faBars;
}
