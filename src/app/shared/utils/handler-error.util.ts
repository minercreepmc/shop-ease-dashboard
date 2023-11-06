import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastrCustomService } from '@shared/libraries/toastr';

export function handleError(e: HttpErrorResponse, toast: ToastrCustomService) {
  if (e.status === HttpStatusCode.Unauthorized) {
    toast.error('Vui lòng dăng nhập');
  }

  if (e.status === HttpStatusCode.Forbidden) {
    toast.error('Bạn không có quyền làm điều này');
  }

  e.error.message.forEach((m: any) => {
    toast.error(m.error);
  });
  console.log(e);
}
