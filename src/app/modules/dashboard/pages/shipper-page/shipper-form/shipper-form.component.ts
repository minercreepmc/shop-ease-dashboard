import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CreateShipperDto, CreateUserDto } from '@dto';
import { CacheStorageFacet, CacheStorageService, UserService } from '@service';
import { FormValueChangesDirective } from '@shared/directives';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './shipper-form.component.html',
  styleUrls: ['./shipper-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormValueChangesDirective,
  ],
})
export class ShipperFormComponent implements OnInit {
  private cacheStorage: CacheStorageFacet;
  constructor(
    private userService: UserService,
    private toast: ToastrCustomService,
    private dialogRef: MatDialogRef<ShipperFormComponent>,
    cacheService: CacheStorageService,
  ) {
    this.cacheStorage = cacheService.forKey('shipper-form');
  }
  createShipperDto = new CreateShipperDto();
  hide = true;

  ngOnInit(): void {
    this.restoreCacheStorage();
  }

  onSubmit() {
    this.userService.createShipper$(this.createShipperDto).subscribe({
      next: () => {
        this.toast.success('Tạo shipper thành công');
      },
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        this.cacheStorage.remove();
        this.dialogRef.close();
      },
    });
  }

  async restoreCacheStorage(): Promise<void> {
    const cachedFormData = await this.cacheStorage.get<CreateUserDto>();

    if (cachedFormData) {
      Object.assign(this.createShipperDto, cachedFormData);
    }
  }

  public saveToTemporaryStorage(): void {
    this.cacheStorage.set({
      ...this.createShipperDto,
      password: undefined,
    });
  }
}
