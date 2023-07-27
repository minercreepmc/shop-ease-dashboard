import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrCustomModule } from '@shared/libraries/toastr';
import { AuthService } from '@shared/services/auth';
import { LogInPageComponent } from './pages/sign-in-page/log-in-page.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';

const providerModules = [
  ToastrCustomModule,
  ReactiveFormsModule,
  HttpClientModule,
];
@NgModule({
  imports: [...providerModules],
  declarations: [LogInPageComponent, LogInFormComponent],
  providers: [AuthService],
})
export class LogInModule {}
