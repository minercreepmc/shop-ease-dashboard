import { NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { toastDiToken } from '@shared/interfaces/toast.interface';
import { ToastrModule } from 'ngx-toastr';
import { ToastrCustomService } from './toastr.service';

const toasts: Provider[] = [
  {
    provide: toastDiToken,
    useClass: ToastrCustomService,
  },
];

@NgModule({
  declarations: [],
  imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
  providers: [...toasts, ToastrCustomService],
  exports: [ToastrModule],
})
export class ToastrCustomModule {}
