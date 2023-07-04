import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/sign-in/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const isSignedIn = this.authService.isSignedIn();
    if (!isSignedIn) {
      this.router.navigate(['/']);
    }
  }
}
