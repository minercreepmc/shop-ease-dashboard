import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable()
export class StorageService {
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user;
    }

    return '';
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(user);
    if (user) {
      return true;
    }

    return false;
  }
}
