import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LogInRequestDto, UserModel } from './auth.service.interface';
import { HttpCustomException } from '@shared/dtos';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiApplication } from '@shared/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  logIn$(dto: LogInRequestDto) {
    return this.http
      .post(ApiApplication.AUTH.CONTROLLER + ApiApplication.AUTH.LOGIN, dto)
      .pipe(catchError(this.handleError));
  }

  logOut$() {
    return this.http
      .post(ApiApplication.AUTH.CONTROLLER + ApiApplication.AUTH.LOGOUT, {})
      .pipe(catchError(this.handleError));
  }

  getProfile$(): Observable<UserModel> {
    return this.http
      .get<UserModel>(
        ApiApplication.AUTH.CONTROLLER + ApiApplication.AUTH.GET_PROFILE,
        {},
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
