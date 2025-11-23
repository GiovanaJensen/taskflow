import { Component, ElementRef, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

@Component({
  selector: 'app-dropdown-sub-trigger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-sub-trigger.component.html',
  styleUrls: ['./dropdown-sub-trigger.component.scss'],
})

export class DropdownSubTriggerComponent {
    constructor(@Optional() private dropdown: DropdownRootComponent, private el: ElementRef) {}
}