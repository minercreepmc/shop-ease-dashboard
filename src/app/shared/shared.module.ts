import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';

@NgModule({
  imports: [FontAwesomeModule, CommonModule],
  exports: [
    FontAwesomeModule,
    CommonModule,
    ToggleButtonComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
  ],
  declarations: [
    ToggleButtonComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
  ],
})
export class SharedModule {}
