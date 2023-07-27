import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
})
export class LogInPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const isSignedIn = this.authService.isLoggedIn();
    if (isSignedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
}
