import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SelectComponent {
  @Input() value: string | number | null = null;
  @Output() valueChange = new EventEmitter<string>();

  open = false;

  toggle() {
    this.open = !this.open;
  }

  selectValue(val: string) {
    this.value = val;
    this.valueChange.emit(val);
    this.open = false;
  }
}