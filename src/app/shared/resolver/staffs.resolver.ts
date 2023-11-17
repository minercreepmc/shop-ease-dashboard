import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserDataRO } from '@ro';
import { UserService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffsResolver implements Resolve<UserDataRO[]> {
  constructor(private userService: UserService) {}
  resolve(): Observable<UserDataRO[]> {
    this.userService.getAllStaffs$().subscribe({
      next: (users) => {
        this.userService.setUsers$(users);
      },
    });
    return this.userService.users$.asObservable();
  }
}
