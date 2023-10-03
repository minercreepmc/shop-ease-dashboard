import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInFormComponent } from '@modules/log-in/components/log-in-form/log-in-form.component';
import { StorageService } from '@shared/services';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
  standalone: true,
  imports: [LogInFormComponent],
})
export class LogInPageComponent implements OnInit {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}
  ngOnInit(): void {
    const isSignedIn = this.storageService.isLoggedIn();
    if (isSignedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
}
