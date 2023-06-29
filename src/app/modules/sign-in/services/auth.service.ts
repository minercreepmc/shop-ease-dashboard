import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInRequestDto, SignInResponseDto } from './auth.service.interface';
import { HttpCustomException } from '@shared/dtos';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // api gateway later
  private readonly apiUrl = 'http://localhost:3001/api/v1/sign-in';

  constructor(private readonly http: HttpClient) {}

  signIn(dto: SignInRequestDto) {
    return this.http.post<SignInResponseDto>(this.apiUrl, dto).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.accessToken);
      }),
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  signOut() {
    localStorage.removeItem('access_token');
  }

  isSignedIn() {
    return !!localStorage.getItem('access_token');
  }
}
