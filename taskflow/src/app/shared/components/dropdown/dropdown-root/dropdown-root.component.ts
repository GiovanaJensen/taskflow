import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown-root.component.html',
  styleUrls: ['./dropdown-root.component.scss'],
  imports: [CommonModule]
})
export class DropdownRootComponent {
  @HostBinding('class.open') open = false;
  @Input() closeOnSelect = true;
  @Output() openChange = new EventEmitter<boolean>();

  items: HTMLElement[] = [];

  constructor(public host: ElementRef<HTMLElement>) {}

  toggle() {
    this.setOpen(!this.open);
  }

  setOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(this.open);
  }

  registerItem(el: HTMLElement) {
    if (!this.items.includes(el)) this.items.push(el);
  }

  unregisterItem(el: HTMLElement) {
    this.items = this.items.filter(i => i !== el);
  }

  close() {
    this.setOpen(false);
  }
}
