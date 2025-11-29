import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar-fallback',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./avatar-fallback.component.scss'],
  templateUrl: './avatar-fallback.component.html'
})
export class AvatarFallbackComponent {
  @Input() className = '';
}