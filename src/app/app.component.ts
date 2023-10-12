import { Component, OnInit } from '@angular/core';
import { AuthService } from '@service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'shop-ease-dashboard';

  ngOnInit(): void {
    this.authService.getProfile$().subscribe({
      next: (profile) => {
        this.authService.setProfile$(profile);
      },
    });
  }
}
