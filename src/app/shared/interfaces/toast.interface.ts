import { InjectionToken } from '@angular/core';

export const toastDiToken = new InjectionToken('TOAST');

export interface ToastPort {
  error(exception: string): void;
}
