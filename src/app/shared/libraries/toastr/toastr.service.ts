import { Injectable, NgZone } from '@angular/core';
import { ToastPort } from '@shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrCustomService implements ToastPort {
  constructor(
    private readonly toastr: ToastrService,
    private zone: NgZone,
  ) {}

  error(exception: string) {
    this.zone.run(() => {
      this.toastr.error(exception);
    });
  }

  success(message: string) {
    this.zone.run(() => {
      this.toastr.success(message);
    });
  }
}
