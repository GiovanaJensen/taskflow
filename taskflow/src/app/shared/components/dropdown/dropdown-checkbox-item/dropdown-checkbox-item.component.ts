import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-checkbox-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-checkbox-item.component.html',
  styleUrls: ['./dropdown-checkbox-item.component.scss'],
})

export class DropdownCheckboxItemComponent implements OnInit, OnDestroy {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef<HTMLElement>, @Optional() private dropdown: DropdownRootComponent) {}

  ngOnInit() {
    this.dropdown?.registerItem(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.dropdown?.unregisterItem(this.el.nativeElement);
  }

  toggle(e: Event) {
    e.stopPropagation();
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}