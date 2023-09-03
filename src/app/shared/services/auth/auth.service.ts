import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetUsersHttpResponse,
  LogInRequestDto,
  LogInResponseDto,
  UserModel,
} from './auth.service.interface';
import { HttpCustomException } from '@shared/dtos';
import { catchError, Observable } from 'rxjs';
import { v1ApiEndpoints } from '@api/http';
import { devEnvironment } from '@env/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly logInUrl = v1ApiEndpoints.logInAdmin;
  private readonly logOutUrl = v1ApiEndpoints.logOut;
  private readonly getProfileUrl = v1ApiEndpoints.getProfile;
  private readonly getUsersUrl = v1ApiEndpoints.getUsers;

  constructor(private readonly http: HttpClient) {}

  logIn(dto: LogInRequestDto) {
    return this.http
      .post<LogInResponseDto>(this.logInUrl, dto, {
        headers: {
          'X-Api-Key': devEnvironment.apiKey,
        },
      })
      .pipe(
        catchError((error) => {
          throw new HttpCustomException(error);
        })
      );
  }

  logOut$() {
    return this.http.post(this.logOutUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  getProfile$(): Observable<UserModel> {
    return this.http.get<UserModel>(this.getProfileUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  getUsers$(): Observable<GetUsersHttpResponse> {
    return this.http.get<GetUsersHttpResponse>(this.getUsersUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }
}
