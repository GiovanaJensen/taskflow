import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./avatar.component.scss'],
  templateUrl: './avatar.component.html'
})
export class AvatarComponent {
  @Input() className = '';
}