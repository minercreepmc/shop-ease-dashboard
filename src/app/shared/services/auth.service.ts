import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiApplication } from '@constant';
import { LogInDto } from '@dto';
import { UserModel } from '@model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  logIn$(dto: LogInDto) {
    return this.http.post(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.LOGIN,
      dto,
    );
  }

  logOut$() {
    return this.http.post(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.LOGOUT,
      {},
    );
  }

  getProfile$(): Observable<UserModel> {
    return this.http.get<UserModel>(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.GET_PROFILE,
      {},
    );
  }
}
