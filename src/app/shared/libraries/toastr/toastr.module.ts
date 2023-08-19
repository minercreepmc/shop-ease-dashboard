import { NgModule, Provider } from '@angular/core';
import { toastDiToken } from '@shared/interfaces/toast.interface';
import { ToastrModule } from 'ngx-toastr';
import { ToastrCustomService } from './toastr.service';

const toasts: Provider[] = [
  {
    provide: toastDiToken,
    useClass: ToastrCustomService,
  },
  ToastrCustomService,
];

@NgModule({
  declarations: [],
  imports: [ToastrModule.forRoot()],
  providers: [...toasts],
  exports: [ToastrModule],
})
export class ToastrCustomModule {}
