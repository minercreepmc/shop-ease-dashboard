import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { UpdateUserDto } from '@dto';
import { UserRO } from '@ro';
import { UserService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toast: ToastrCustomService,
  ) {}
  user: UserRO;
  updateUserDto = new UpdateUserDto();
  hide = true;
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
      this.updateUserDto = {
        fullName: this.user.full_name,
        email: this.user.email,
        phone: this.user.phone,
      };
    });
  }

  onSubmit() {
    this.userService.updateUser$(this.user.id, this.updateUserDto).subscribe({
      next: () => {
        this.toast.success('Cập nhật thành công');
      },
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
    });
  }
}
