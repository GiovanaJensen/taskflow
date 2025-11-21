import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

type ButtonVariant = 
 | 'default'
 | 'destructive'
 | 'outline'
 | 'secondary'
 | 'ghost'
 | 'link';

type ButtonSize =
 | 'default'
 | 'sm'
 | 'lg'
 | 'icon'
 | 'full';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class ButtonComponent {
    @Input() variant: ButtonVariant = 'default';
    @Input() size: ButtonSize = 'default';
    @Input() disabled: boolean = false;
    @Input() type:  'button' | 'submit' | 'reset' = 'button';

    get classes(): string {
        return `${this.variant} ${this.size}`;
    }
}