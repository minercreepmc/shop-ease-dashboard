import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { LogInModule } from '@modules/log-in/log-in.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpCustomExceptionHandler } from './core/exception-handler';
import {
  CleanPayloadInterceptor,
  httpInterceptorProviders,
} from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrCustomModule } from '@shared/libraries/toastr';

const exceptionHandlers: Provider[] = [
  {
    provide: ErrorHandler,
    useClass: HttpCustomExceptionHandler,
  },
];

const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CleanPayloadInterceptor,
    multi: true,
  },
  httpInterceptorProviders,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastrCustomModule,
    BrowserModule,
    AppRoutingModule,
    LogInModule,
    ReactiveFormsModule,
    DashboardModule,
    BrowserAnimationsModule,
  ],
  providers: [...exceptionHandlers, ...interceptors],
  bootstrap: [AppComponent],
})
export class AppModule {}
