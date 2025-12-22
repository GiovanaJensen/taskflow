import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Tarefa } from '../../interfaces/Tarefa';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, TaskCardComponent]
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() selectedCategory: number | null = null;
  @Input() showCompleted: boolean = true;
  @Input() taskCreated: number = 0;

  tasks: Tarefa[] = [];
  isLoading = true;

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskCreated'] && !changes['taskCreated'].firstChange) {
      this.loadTasks();
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;

    const request$ = this.selectedCategory
      ? this.taskService.getByCategory(this.selectedCategory)
      : this.taskService.getAll();

    request$.subscribe({
      next: (tasks) => {
        this.tasks = this.showCompleted
          ? tasks
          : tasks.filter(t => !t.completed);
        
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error)
      }
    });
  }

  toggleComplete(task: Tarefa) {
    task.completed = !task.completed;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(Number(id)).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (error) => {
        alert('Erro ao deletar tarefa');
      }
    });
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