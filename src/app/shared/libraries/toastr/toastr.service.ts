import { Injectable, NgZone } from '@angular/core';
import { ToastPort } from '@shared/interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrCustomServices implements ToastPort {
  constructor(private readonly toastr: ToastrService, private zone: NgZone) {}

  error(exception: string) {
    this.zone.run(() => {
      this.toastr.error(exception);
    });
  }
}
