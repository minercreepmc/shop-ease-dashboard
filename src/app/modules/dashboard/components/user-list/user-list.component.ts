import { NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserModel } from '@model';
import { Columns, Config, DefaultConfig, TableModule } from 'ngx-easy-table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, RouterLink, NgClass, TableModule, RouterModule],
})
export class UserListComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() users: UserModel[] = [];
  @Input() detailRoute = 'users';

  columns: Columns[] = [
    { key: 'full_name', title: 'Name' },
    { key: 'phone', title: 'Phone' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
  ];
  configuration: Config;
  clicked: string;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
  }
  eventEmitted($event: { event: string; value: any }): void {
    this.clicked = JSON.stringify($event);
    // eslint-disable-next-line no-console
    this.router.navigate(['dashboard', this.detailRoute, $event.value.row.id]);
  }
}
