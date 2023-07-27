import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCustomException } from '@shared/dtos';
import { AuthService } from '@shared/services/auth';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
})
export class LogInFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService
        .logIn({
          username,
          password,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error: HttpCustomException) => {
            throw error;
          },
          complete: () => {
            this.loginForm.reset();
          },
        });
    }
  }
}
