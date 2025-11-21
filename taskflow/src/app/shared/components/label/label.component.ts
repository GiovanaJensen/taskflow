import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LabelComponent {
  @Input() for?: string;
  @Input() disabled = false;
}