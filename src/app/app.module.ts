import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { LogInModule } from '@modules/log-in/log-in.module';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpCustomExceptionHandler } from './core/exception-handler';
import { CleanPayloadInterceptor } from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LogInModule,
    SharedModule,
    ReactiveFormsModule,
    DashboardModule,
    BrowserAnimationsModule,
  ],
  providers: [...exceptionHandlers, ...interceptors],
  bootstrap: [AppComponent],
})
export class AppModule {}
