import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}

  getDailyIncome$() {
    return this.http.post<number>(
      ApiApplication.INCOME.CONTROLLER + '/' + ApiApplication.INCOME.GET_DAILY,
      {},
    );
  }

  getMonthlyIncome$() {
    return this.http.post<number>(
      ApiApplication.INCOME.CONTROLLER +
        '/' +
        ApiApplication.INCOME.GET_MONTHLY,
      {},
    );
  }

  getWeeklyIncome$() {
    return this.http.post<number>(
      ApiApplication.INCOME.CONTROLLER + '/' + ApiApplication.INCOME.GET_WEEKLY,
      {},
    );
  }
}
