import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select-content',
  templateUrl: './select-content.component.html',
  styleUrls: ['./select-content.component.scss'],
  standalone: true
})
export class SelectContentComponent {
  @Input() selected: string | null = null;
  @Output() selectItem = new EventEmitter<string>();
}