import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCustomException } from '@shared/dtos';
import { AuthService, StorageService } from '@shared/services/auth';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [AuthService, StorageService],
})
export class LogInFormComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginFailed = false;
  isLoggedIn = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly storageSerivce: StorageService,
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
          next: (response) => {
            this.storageSerivce.saveUser(response);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/dashboard']);
          },
          error: (error: HttpCustomException) => {
            throw error;
          },
          complete: () => {
            this.loginForm.reset();
            window.location.reload();
          },
        });
    }
  }
}
