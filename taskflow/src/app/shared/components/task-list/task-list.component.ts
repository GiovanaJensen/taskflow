import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Tarefa } from '../../interfaces/Tarefa';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, TaskCardComponent]
})
export class TaskListComponent implements OnInit {

  @Input() selectedCategory: string | null = null;
  @Input() showCompleted: boolean = true;

  tasks: Tarefa[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadMockTasks();
  }

  loadMockTasks() {
    this.isLoading = true;

    // MOCK de tarefas
    this.tasks = [
      {
        id: '1',
        title: 'Finalizar relatório',
        description: 'Relatório para enviar ao gestor',
        completed: false,
        priority: 'high',
        due_date: '2025-02-10',
        category_id: '1',
        created_at: new Date().toISOString(),
        categories: {
          name: 'Trabalho',
          color: '#3b82f6',
          icon: '💼'
        }
      },
      {
        id: '2',
        title: 'Comprar mantimentos',
        description: null,
        completed: false,
        priority: 'low',
        due_date: null,
        category_id: '2',
        created_at: new Date().toISOString(),
        categories: {
          name: 'Pessoal',
          color: '#ef4444',
          icon: '🏠'
        }
      }
    ];

    this.isLoading = false;
  }

  toggleComplete(task: Tarefa) {
    task.completed = !task.completed;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  get pendingTasks() {
    return this.tasks.filter(t =>
      !t.completed &&
      (!this.selectedCategory || t.category_id === this.selectedCategory)
    );
  }

  get completedTasks() {
    return this.tasks.filter(t =>
      t.completed &&
      (!this.selectedCategory || t.category_id === this.selectedCategory)
    );
  }
}