import { Component, HostListener } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
  selector: 'app-select-trigger',
  templateUrl: './select-trigger.component.html',
  styleUrls: ['./select-trigger.component.scss'],
  standalone: true
})
export class SelectTriggerComponent {
  constructor(public parent: SelectComponent) {}

  @HostListener('click')
  toggle() {
    this.parent.toggle();
  }
}