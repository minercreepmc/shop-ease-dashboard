import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, FormsModule],
})
export class SkeletonComponent {
  constructor(private dialog: MatDialog) {}

  @Input() dialogComponent: any;
  @Input() title: string;
  @Input() action: string;

  openDialog() {
    const dialogRef = this.dialog.open(this.dialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
