import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from '../../interfaces/Tarefa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CardComponent } from "../card/card/card.component";
import { CardContentComponent } from "../card/card-content/card-content.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { BadgeComponent } from "../badge/badget.component";
import { ButtonComponent } from "../button/button.component";
import { DropdownRootComponent } from "../dropdown/dropdown-root/dropdown-root.component";
import { DropdownTriggerComponent } from "../dropdown/dropdown-trigger/dropdown-trigger.component";
import { DropdownContentComponent } from "../dropdown/dropdown-content/dropdown-content.component";
import { DropdownItemComponent } from "../dropdown/dropdown-item/dropdown-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  standalone: true,
  imports: [
    CardComponent, 
    CardContentComponent, 
    CheckboxComponent, 
    CommonModule,
    BadgeComponent, 
    ButtonComponent,
    DropdownRootComponent, 
    DropdownTriggerComponent, 
    DropdownContentComponent, 
    DropdownItemComponent
  ],
})
export class TaskCardComponent {
  @Input() task!: Tarefa;
  @Output() toggleComplete = new EventEmitter<{ id: string; completed: boolean }>();
  @Output() delete = new EventEmitter<string>();

  priorityColors: Record<Tarefa['priority'], string> = {
    low: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    medium: 'bg-warning/10 text-warning-foreground',
    high: 'bg-destructive/10 text-destructive',
  };

  priorityLabels: Record<Tarefa['priority'], string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };

  formatDate(date: string) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  }

  onToggle() {
    this.toggleComplete.emit({ id: this.task.id, completed: this.task.completed });
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}