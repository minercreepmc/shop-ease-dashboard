import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserModel } from '@model';
import { UserService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<UserModel[]> {
  constructor(private userService: UserService) {}
  resolve(): Observable<UserModel[]> {
    this.userService.getUsers$().subscribe({
      next: (users) => {
        this.userService.setUsers$(users);
      },
    });
    return this.userService.users$.asObservable();
  }
}
