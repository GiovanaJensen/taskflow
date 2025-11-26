import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Optional, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-item.component.html',
  styleUrls: ['./dropdown-item.component.scss'],
})

export class DropdownItemComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() value?: any;
  @Output() select = new EventEmitter<any>();

  constructor(private el: ElementRef<HTMLElement>, @Optional() private dropdown: DropdownRootComponent) {}

  ngOnInit() {
    this.dropdown?.registerItem(this.el.nativeElement);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.dropdown?.unregisterItem(this.el.nativeElement);
  }

  onSelect(e: Event) {
    e.stopPropagation();
    this.select.emit(this.value);
    if (this.dropdown?.closeOnSelect) this.dropdown.close();
  }

  onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.onSelect(e as unknown as Event);
    }
  }
}