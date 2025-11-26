import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { AvatarFallbackComponent } from '../avatar/avatar-fallback/avatar-fallback.component';
import { AvatarImageComponent } from '../avatar/avatar-image/avatar-image.component';
import { DropdownRootComponent } from "../dropdown/dropdown-root/dropdown-root.component";
import { DropdownTriggerComponent } from "../dropdown/dropdown-trigger/dropdown-trigger.component";
import { DropdownContentComponent } from '../dropdown/dropdown-content/dropdown-content.component';
import { DropdownLabelComponent } from '../dropdown/dropdown-label/dropdown-label.component';
import { DropdownSeparatorComponent } from '../dropdown/dropdown-separator/dropdown-separator.component';
import { DropdownItemComponent } from '../dropdown/dropdown-item/dropdown-item.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AvatarComponent,
    AvatarFallbackComponent,
    AvatarImageComponent,
    DropdownRootComponent,
    DropdownTriggerComponent,
    DropdownContentComponent,
    DropdownLabelComponent,
    DropdownSeparatorComponent,
    DropdownItemComponent
],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showFallback = false;
  userImage = 'https://example.com/profile.png';
  userInitials = 'GF';

  @Input() user: { email?: string } | null = null;


  handleLogout() {
    console.log('logout...');
  }
}
