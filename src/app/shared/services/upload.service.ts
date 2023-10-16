import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { DestroyFileDto, UploadFilesDto } from '@dto';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  uploadMultiple(dto: UploadFilesDto) {
    const { files } = dto;

    console.log(files);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files[${i}]`, files[i]);
    }
    console.log(formData.get('files'));
    return this.http.post<string[]>(ApiApplication.UPLOAD.CONTROLLER, formData);
  }

  destroy(dto: DestroyFileDto) {
    return this.http.post<string[]>(
      ApiApplication.UPLOAD.CONTROLLER + '/' + ApiApplication.UPLOAD.DESTROY,
      dto,
    );
  }
}
