import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { AvatarFallbackComponent } from '../avatar/avatar-fallback/avatar-fallback.component';
import { AvatarImageComponent } from '../avatar/avatar-image/avatar-image.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    AvatarFallbackComponent,
    AvatarImageComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFallback = false;
  userImage = 'https://example.com/profile.png';
  userInitials = 'GF';
}
