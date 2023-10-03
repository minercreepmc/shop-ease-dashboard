import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from '@service';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MenuComponent, NavigationComponent, RouterOutlet],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    const isSignedIn = this.storageService.isLoggedIn();
    if (!isSignedIn) {
      this.router.navigate(['/']);
    }
  }
}
