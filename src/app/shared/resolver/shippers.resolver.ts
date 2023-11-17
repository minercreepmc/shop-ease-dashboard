import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShipperGetAllDataRO } from '@ro';
import { UserService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippersResolver implements Resolve<ShipperGetAllDataRO[]> {
  constructor(private userService: UserService) {}
  resolve(): Observable<ShipperGetAllDataRO[]> {
    this.userService.getAllShippers$().subscribe({
      next: (response) => {
        this.userService.setUsers$(response.data);
      },
    });
    return this.userService.users$.asObservable();
  }
}
