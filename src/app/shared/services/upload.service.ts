import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { UploadFilesDto } from '@dto';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  uploadMultiple(dto: UploadFilesDto) {
    return this.http.post<string[]>(
      ApiApplication.UPLOAD.CONTROLLER + '/' + ApiApplication.UPLOAD.UPLOAD,
      dto,
    );
  }
}
