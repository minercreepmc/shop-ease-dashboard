import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ToastrCustomService } from '@shared/libraries/toastr';

export function handleError(e: HttpErrorResponse, toast: ToastrCustomService) {
  if (e.status === HttpStatusCode.Unauthorized) {
    toast.error('Please log in to do action');
  }

  if (e.status === HttpStatusCode.Forbidden) {
    toast.error('You don\'t have permission to do this action');
  }

  e.error.message.forEach((m: any) => {
    toast.error(m.error);
  });
  console.log(e);
}
