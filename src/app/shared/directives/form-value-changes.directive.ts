// Import the core angular services.
import { Directive, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
  selector: 'form[valueChanges]',
  standalone: true,
})
export class FormValueChangesDirective {
  @Output() valueChanges = new EventEmitter<any>();

  // I initialize the form value-changes directive. The goal of this directive is to
  // expose the (valueChanges) event on the underlying NgForm object such that it can
  // be subscribed-to in a template-driven form.
  constructor(form: NgForm) {
    if (form.valueChanges) {
      form.valueChanges.subscribe((value) => {
        this.valueChanges.emit(value);
      });
    }
  }
}
