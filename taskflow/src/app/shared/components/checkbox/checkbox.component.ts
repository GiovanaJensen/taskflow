import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'checkbox',
  standalone: true,
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() disabled = false;
  checked = false;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}