import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import {
  CreateShipperDto,
  CreateStaffDto,
  ShipperGetAllDto,
  UpdateUserDto,
} from '@dto';
import { UserModel } from '@model';
import { ShipperGetAllRO, UserDataRO } from '@ro';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private users = new BehaviorSubject<any[]>([]);

  get users$() {
    return this.users;
  }

  createStaff$(dto: CreateStaffDto): Observable<UserModel> {
    return this.http
      .post<UserModel>(
        ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.CREATE_STAFF,
        dto,
      )
      .pipe(
        tap((user) => {
          this.users.next([...this.users.value, user]);
        }),
      );
  }

  createShipper$(dto: CreateShipperDto): Observable<UserModel> {
    return this.http
      .post<UserModel>(
        ApiApplication.USER.CONTROLLER +
          '/' +
          ApiApplication.USER.CREATE_SHIPPER,
        dto,
      )
      .pipe(
        tap((user) => {
          this.users.next([...this.users.value, user]);
        }),
      );
  }

  updateUser$(id: string, dto: UpdateUserDto): Observable<UserModel> {
    return this.http.put<UserModel>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.UPDATE.replace(':id', id),
      dto,
    );
  }

  setUsers$(users: any[]) {
    this.users.next(users);
  }

  getUser$(id: string) {
    return this.http.get<UserDataRO>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.GET_ONE.replace(':id', id),
      {},
    );
  }

  getUsers$() {
    return this.http.get<UserModel[]>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.GET_ALL_USER,
      {},
    );
  }

  getAllStaffs$(): Observable<UserDataRO[]> {
    return this.http.post<UserDataRO[]>(
      ApiApplication.USER.CONTROLLER + '/' + ApiApplication.USER.GET_ALL_STAFF,
      {},
    );
  }

  getAllShippers$(dto?: ShipperGetAllDto): Observable<ShipperGetAllRO> {
    return this.http.get<ShipperGetAllRO>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.GET_ALL_SHIPPER,
      {
        params: dto ? this.toHttpParams(dto) : undefined,
      },
    );
  }

  countDailyMember$() {
    return this.http.post<number>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.COUNT_DAILY_MEMBER,
      {},
    );
  }

  countMonthlyMember$() {
    return this.http.post<number>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.COUNT_MONTHLY_MEMBER,
      {},
    );
  }

  countWeeklyMember$() {
    return this.http.post<number>(
      ApiApplication.USER.CONTROLLER +
        '/' +
        ApiApplication.USER.COUNT_WEEKLY_MEMBER,
      {},
    );
  }

  toHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }
}
