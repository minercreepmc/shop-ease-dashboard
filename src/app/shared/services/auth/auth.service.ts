import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogInRequestDto, LogInResponseDto } from './auth.service.interface';
import { HttpCustomException } from '@shared/dtos';
import { catchError } from 'rxjs';
import { v1ApiEndpoints } from '@api/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // api gateway later
  private readonly logInUrl = v1ApiEndpoints.logIn;
  private readonly logOutUrl = v1ApiEndpoints.logOut;

  constructor(private readonly http: HttpClient) {}

  logIn(dto: LogInRequestDto) {
    return this.http.post<LogInResponseDto>(this.logInUrl, dto).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  logOut() {
    return this.http.post(this.logOutUrl, {}).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  isLoggedIn() {
    // check cookie
    return true;
  }
}
