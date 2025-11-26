import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./avatar-image.component.scss'],
  templateUrl: './avatar-image.component.html'
})
export class AvatarImageComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() className = '';
  @Output() onError = new EventEmitter<void>();
}