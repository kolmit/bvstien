import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  templateUrl: './input-component.component.html',
  styleUrls: ['./input-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  constructor() {}
  onChange: any = () => {};
  onTouch: any = () => {};
  inputValue = ''; // this is the updated value that the class accesses

  @Input()
  inputType: string;

  @Input()
  placeholder: string;

  @Input()
  name: string;

  set value(value) {
    // this value is updated by programmatic changes
    if (value !== undefined && this.value !== value) {
      this.inputValue = value;
      this.onChange(value);
      this.onTouch(value);
    }
  }

  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value;
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
