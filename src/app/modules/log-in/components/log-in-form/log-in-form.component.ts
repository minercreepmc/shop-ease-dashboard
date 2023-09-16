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
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { AuthService, StorageService } from '@shared/services/auth';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, ToastrCustomModule],
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
    private readonly toast: ToastrCustomService,
    private readonly router: Router,
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
      const fullName = this.loginForm.get('fullName')?.value;

      this.authService
        .logIn({
          username,
          password,
          fullName,
        })
        .subscribe({
          next: (response) => {
            this.storageSerivce.saveUser(response);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.router.navigate(['/dashboard']);
          },
          error: (error: HttpCustomException) => {
            if (error.statusCode === 401) {
              this.toast.error('Lỗi đăng nhập');
            } else {
              this.toast.error('Xin vui lòng thử lại sau');
            }
          },
          complete: () => {
            this.loginForm.reset();
            window.location.reload();
          },
        });
    }
  }
}
