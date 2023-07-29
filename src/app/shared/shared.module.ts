import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [FontAwesomeModule, CommonModule],
  exports: [FontAwesomeModule, CommonModule],
})
export class SharedModule {}
