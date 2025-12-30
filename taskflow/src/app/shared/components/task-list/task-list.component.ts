import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Tarefa } from '../../interfaces/Tarefa';
import { TaskService } from '../../services/task.service';
import { FeedbackDialogComponent } from "../feedback-dialog/feedback-dialog.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, TaskCardComponent, FeedbackDialogComponent]
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() selectedCategory: number | null = null;
  @Input() showCompleted: boolean = true;
  @Input() taskCreated: number = 0;

  tasks: Tarefa[] = [];
  isLoading = true;

  openFeedbackDialog = false;
  descriptionkDialog = '';
  typeDialog: "error" | "warning" | "success" = "success";

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskCreated'] && !changes['taskCreated'].firstChange) {
      this.loadTasks();
    }
    if (changes['showCompleted'] && !changes['showCompleted'].firstChange) {
      this.loadTasks();
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;

    const request$ = this.selectedCategory
      ? this.taskService.getByCategory(this.selectedCategory, this.showCompleted)
      : this.taskService.getAll(this.showCompleted);

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
    const payload = {
      id: Number(task.id),
      isCompleted: !task.completed
    }
    console.log('task: ', task)
    this.taskService.finishTask(payload).subscribe({
      next: () => {
        task.completed = !task.completed;
      },
      error: () => {
        this.openFeedbackDialog = true;
        this.descriptionkDialog = "Erro ao concluir a tarefa!";
        this.typeDialog = 'error';
      }
    })
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(Number(id)).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (error) => {
        this.openFeedbackDialog = true;
        this.descriptionkDialog = `Erro ao deletar a tarefa! ${error}`;
        this.typeDialog = 'error';
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