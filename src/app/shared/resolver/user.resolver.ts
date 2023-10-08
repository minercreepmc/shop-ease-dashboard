import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserRO } from '@ro';
import { UserService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserRO> {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<UserRO> {
    const id = route.paramMap.get('id');
    return this.userService.getUser$(id!);
  }
}
