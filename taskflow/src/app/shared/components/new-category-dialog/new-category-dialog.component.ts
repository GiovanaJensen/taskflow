import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/Categoria';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { SelectTriggerComponent } from '../select/select-trigger/select-trigger.component';
import { SelectContentComponent } from '../select/select-content/select-content.component';
import { SelectItemComponent } from '../select/select-item/select-item.component';
import { DialogTitle } from "../dialog/dialog-title/dialog-title.component";
import { DialogDescription } from "../dialog/dialog-description/dialog-description.component";
import { DialogFooter } from "../dialog/dialog-footer/dialog-footer.component";
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-new-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent,
    DialogTitle,
    DialogDescription,
    DialogFooter
],
  templateUrl: './new-category-dialog.component.html',
  styleUrls: ['./new-category-dialog.component.scss']
})
export class NewCategoryDialogComponent {

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() submitCategory = new EventEmitter<any>();

  name = '';
  description = '';

  isSubmitting = false;

  constructor(private categoryService: CategoryService) {}

  close() {
    this.openChange.emit(false);
  }

  submit() {
    this.isSubmitting = true;

    this.submitCategory.emit({
      name: this.name,
      description: this.description || null
    });

    this.resetForm();
    this.isSubmitting = false;
    this.close();
  }

  resetForm() {
    this.name = '';
    this.description = '';
  }
}