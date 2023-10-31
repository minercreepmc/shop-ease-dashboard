import {
  HttpClientModule,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '@constant';
import { AuthService } from '@service';
import { LogInDto } from '@shared/interfaces/dto';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule],
})
export class LogInFormComponent {
  user: LogInDto = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private toast: ToastrCustomService,
    private router: Router,
  ) {}

  onSubmit() {
    const { username, password } = this.user;
    this.authService
      .logInDashboard$({
        username,
        password,
      })
      .subscribe({
        next: (user) => {
          switch (user.role) {
            case UserRole.ADMIN:
              this.router.navigate(['/dashboard']);
              break;
            case UserRole.SHIPPER:
              this.router.navigate(['/dashboard/shipping']);
              break;
            default:
              this.router.navigate(['/dashboard/products']);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.toast.error('Đăng nhập thất bại');
          } else if (error.status === HttpStatusCode.Forbidden) {
            this.toast.error('Bạn không có quyền để truy cập');
          } else {
            this.toast.error('Đã xảy ra vấn đề. Vui lòng thử lại sau');
          }
        },
      });
  }
}
