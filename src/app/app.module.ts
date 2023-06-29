import { ErrorHandler, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { SignInModule } from '@modules/sign-in/sign-in.module';
import { HttpCustomExceptionHandler } from '@shared/exception-handler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const exceptionHandlers: Provider[] = [
  {
    provide: ErrorHandler,
    useClass: HttpCustomExceptionHandler,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SignInModule, DashboardModule],
  providers: [...exceptionHandlers],
  bootstrap: [AppComponent],
})
export class AppModule {}
