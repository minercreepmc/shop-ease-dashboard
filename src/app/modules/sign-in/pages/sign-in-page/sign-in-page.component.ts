import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/sign-in/services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    const isSignedIn = this.authService.isSignedIn();
    if (isSignedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
}
