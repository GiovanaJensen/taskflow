import { Component, HostListener, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-trigger.component.html',
  styleUrls: ['./dropdown-trigger.component.scss'],
})
export class DropdownTriggerComponent {
  @Input() disabled = false;
  constructor(@Optional() public dropdown: DropdownRootComponent) {}

  onClick(e: Event) {
    if (this.disabled) return;
    this.dropdown?.toggle();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!this.dropdown) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.dropdown.setOpen(true);
      setTimeout(() => this.dropdown.items[0]?.focus(), 0);
    }
  }
}