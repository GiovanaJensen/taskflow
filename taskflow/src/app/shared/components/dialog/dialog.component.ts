import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [CommonModule]
})
export class DialogComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  close() {
    this.open = false;
    this.openChange.emit(false);
  }

  openDialog() {
    this.open = true;
    this.openChange.emit(true);
  }
}