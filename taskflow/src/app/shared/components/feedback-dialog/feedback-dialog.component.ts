import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent
],
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnChanges {

  @Input() open = false;
  @Input() description = '';
  @Input() type: 'error' | 'warning' | 'success' = 'success';
  @Output() openChange = new EventEmitter<boolean>();

  img: string = '../../../../assets/success.png';
  title: string = "Sucesso!";

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['open']) {
      switch (this.type) {
        case 'success':
          this.img = "../../../../assets/success.png";
          this.title = "Sucesso!"
          break;
        case 'error':
          this.img = "../../../../assets/error.jpg";
          this.title = "Erro!"
          break;
        default:
          break;
      }
    }
  }

  close() {
    this.openChange.emit(false);
  }

}