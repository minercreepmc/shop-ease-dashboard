import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, AuthService } from '@service';
import { HttpCustomException } from '@shared/dtos';
import { LogInDto } from '@shared/interfaces/dto';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, ToastrCustomModule],
})
export class LogInFormComponent {
  user: LogInDto = {
    username: '',
    password: '',
  };

  constructor(
    private readonly authService: AuthService,
    private readonly storageSerivce: StorageService,
    private readonly toast: ToastrCustomService,
    private readonly router: Router,
  ) {}

  onSubmit() {
    const { username, password } = this.user;
    this.authService
      .logIn$({
        username,
        password,
      })
      .subscribe({
        next: (response) => {
          this.storageSerivce.saveUser(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpCustomException) => {
          if (error.statusCode === 401) {
            this.toast.error('Fail to login');
          } else {
            this.toast.error('Something went wrong');
          }
        },
      });
  }
}
