import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserRO } from '@ro';
import { UserService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffsResolver implements Resolve<UserRO[]> {
  constructor(private userService: UserService) {}
  resolve(): Observable<UserRO[]> {
    this.userService.getAllStaffs$().subscribe({
      next: (users) => {
        this.userService.setUsers$(users);
      },
    });
    return this.userService.users$.asObservable();
  }
}
