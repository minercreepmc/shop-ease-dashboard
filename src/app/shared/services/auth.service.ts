import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiApplication } from '@constant';
import { LogInDto } from '@dto';
import { UserModel } from '@model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  profile = new ReplaySubject<UserModel>();

  get profile$() {
    return this.profile;
  }

  setProfile$(profile: UserModel) {
    this.profile.next(profile);
  }

  logIn$(dto: LogInDto) {
    return this.http.post(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.LOGIN,
      dto,
    );
  }

  logInDashboard$(dto: LogInDto) {
    return this.http.post(
      ApiApplication.AUTH.CONTROLLER +
        '/' +
        ApiApplication.AUTH.LOGIN_DASHBOARD,
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

  isLoggedIn$(): Observable<boolean> {
    return this.http.post<boolean>(
      ApiApplication.AUTH.CONTROLLER + '/' + ApiApplication.AUTH.IS_LOGGED_IN,
      {},
    );
  }
}
