import {
  ElementRef,
  HostListener,
  forwardRef,
  AfterViewInit,
  Directive,
  HostBinding,
  Renderer2,
  OnInit,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[text-editable]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditableDirective),
      multi: true,
    },
  ],
  standalone: true,
})
export class TextEditableDirective
  implements ControlValueAccessor, AfterViewInit
{
  constructor(private el: ElementRef) {}
  @HostBinding('style.padding') padding = '2px 4px';
  @HostBinding('style.pointer-events') pointerEvents = 'auto';
  @HostBinding('style.background') background = 'transparent';
  @HostBinding('style.color') color = 'initial';

  @HostListener('input') callOnChange() {
    this.onChange(this.el.nativeElement.textContent);
  }
  @HostListener('blur') callOnTouched() {
    this.onTouched();
  }

  onChange: (value: string) => void; // init by this.registerOnChange
  onTouched: () => void; // init by this.registerOnTouched

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute('contenteditable', 'true');
  }

  // called when model is written to view. (model -> view)
  writeValue(value: any) {
    this.el.nativeElement.textContent = value || '';
  }

  registerOnChange(fn: any) {
    console.log(fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // called when element property disabled is changed
  setDisabledState(val: boolean): void {
    this.el.nativeElement.setAttribute('disabled', String(val));
    this.el.nativeElement.setAttribute('contenteditable', String(!val));
  }
}
