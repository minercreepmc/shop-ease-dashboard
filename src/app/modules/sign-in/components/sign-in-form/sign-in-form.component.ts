import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/sign-in/services/auth.service';
import { V1SignInHttpResponse } from '@protos/api/http/v1/signin.http.api.v1';
import { HttpCustomException } from '@shared/dtos';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
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
        .signIn({
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
