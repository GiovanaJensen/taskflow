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
  selector: 'app-new-task-dialog',
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
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent implements OnChanges {

  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() submitTask = new EventEmitter<any>();

  categories: Categoria[] = [];

  title = '';
  description = '';
  categoryId: string | null = null;
  priority: 'baixa' | 'média' | 'alta' = 'média';
  dueDate: string | null = null;

  isSubmitting = false;

  constructor(private categoryService: CategoryService) {}

  ngOnChanges() {
    if (this.open) {
      this.loadCategories();
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data.map(category => ({
          ...category,
          icon: this.getIcon(category.name),
          color: this.getColor(category.name)
        }))
      }
    });
  }

  getIcon(name: string): string {
    const icons: Record<string, string> = {
      pessoal: '🏠',
      trabalho: '💼',
      estudos: '📚'
    }

    return icons[name.toLowerCase()] ?? '📁'
  }

  getColor(name: string): string {
    const colors: Record<string, string> = {
      pessoal: '#ef4444',
      trabalho: '#3b82f6',
      estudos: '#22c55e'
    };
  
    return colors[name.toLowerCase()] ?? '#64748b';
  }

  close() {
    this.openChange.emit(false);
  }

  submit() {
    this.isSubmitting = true;

    const category = this.categories.find(c => c.name == this.categoryId);

    if (!this.dueDate) {
      this.isSubmitting = false;
      return;
    }

    this.submitTask.emit({
      title: this.title,
      description: this.description || null,
      categoryId: category!.id,
      taskPriority: this.mapPriority(this.priority),
      dueDate: new Date(this.dueDate).toISOString()
    });

    this.resetForm();
    this.isSubmitting = false;
    this.close();
  }

  mapPriority(priority: string): number {
    let value = 2;
    switch (priority) {
      case "baixa":
        value = 1;
        break;
      case "média":
        value = 2;
        break;
      case "alta":
        value = 3;
        break;
      default:
        break;
    }
    return value;
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.categoryId = null;
    this.priority = 'média';
    this.dueDate = null;
  }
}