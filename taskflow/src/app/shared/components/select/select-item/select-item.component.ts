import { Component, Input } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
  standalone: true
})
export class SelectItemComponent {
  @Input() value!: string;

  constructor(public parent: SelectComponent) {}

  click() {
    this.parent.selectValue(this.value);
  }

  get selected() {
    return this.parent.value === this.value;
  }
}