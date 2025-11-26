import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRadioGroupComponent } from '../dropdown-radio-group/dropdown-radio-group.component';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-radio-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-radio-item.component.html',
  styleUrls: ['./dropdown-radio-item.component.scss'],
})

export class DropdownRadioItemComponent implements OnInit {
  @Input() value: any;

  constructor(@Optional() private group: DropdownRadioGroupComponent, @Optional() private dropdown: DropdownRootComponent, private el: ElementRef) {}

  ngOnInit() {
    this.dropdown?.registerItem(this.el.nativeElement);
  }

  select() {
    this.group?.setValue(this.value);
    if (this.dropdown?.closeOnSelect) this.dropdown.close();
  }
}