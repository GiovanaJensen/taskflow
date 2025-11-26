import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-radio-group.component.html',
  styleUrls: ['./dropdown-radio-group.component.scss'],
})

export class DropdownRadioGroupComponent {
  @Output() valueChange = new EventEmitter<any>();
  value?: any;

  setValue(v: any) {
    this.value = v;
    this.valueChange.emit(this.value);
  }
}