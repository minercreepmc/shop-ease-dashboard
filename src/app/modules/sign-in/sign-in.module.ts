import { NgModule } from '@angular/core';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrCustomModule } from '@shared/libraries/toastr';

const providerModules = [
  ToastrCustomModule,
  ReactiveFormsModule,
  HttpClientModule,
];
@NgModule({
  imports: [...providerModules],
  declarations: [SignInPageComponent, SignInFormComponent],
  providers: [AuthService],
})
export class SignInModule {}
