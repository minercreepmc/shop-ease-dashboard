import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserModel } from '@model';
import { AuthService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<UserModel> {
  constructor(private authService: AuthService) {}
  resolve(): Observable<UserModel> {
    return this.authService.getProfile$();
  }
}
