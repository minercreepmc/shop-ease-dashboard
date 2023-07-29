import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  standalone: true
})
export class ToggleButtonComponent {
  @Input() contentVisibility = false;
  @Output() toggleContentVisibility = new EventEmitter();

  faPlus = faPlus;
  faMinus = faMinus;

  onClick() {
    this.toggleContentVisibility.emit();
  }
}
