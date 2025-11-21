import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() value?: string;
  @Input() name?: string;
  @Input() id?: string;
}