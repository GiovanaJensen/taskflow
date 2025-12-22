import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FiltroCategoriaComponent } from "../../shared/components/filtro-categoria/filtro-categoria.component";
import { TaskListComponent } from "../../shared/components/task-list/task-list.component";
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { DialogDescription } from "../../shared/components/dialog/dialog-description/dialog-description.component";
import { DialogFooter } from "../../shared/components/dialog/dialog-footer/dialog-footer.component";
import { DialogTitle } from "../../shared/components/dialog/dialog-title/dialog-title.component";
import { SelectComponent } from "../../shared/components/select/select.component";
import { SelectTriggerComponent } from "../../shared/components/select/select-trigger/select-trigger.component";
import { SelectContentComponent } from "../../shared/components/select/select-content/select-content.component";
import { SelectItemComponent } from "../../shared/components/select/select-item/select-item.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { NewTaskDialogComponent } from "../../shared/components/new-task-dialog/new-task-dialog.component";
import { TaskService } from "../../shared/services/task.service";
import { NewCategoryDialogComponent } from "../../shared/components/new-category-dialog/new-category-dialog.component";
import { CategoryService } from "../../shared/services/category.service";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    FiltroCategoriaComponent,
    TaskListComponent,
    DialogComponent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent,
    ButtonComponent,
    NewTaskDialogComponent,
    NewCategoryDialogComponent
]
})
export class HomeComponent {
  openDialog = false;
  openNewTask = false;
  openNewCategory = false;
  taskCreatedVersion = 0;
  categoryCreatedVersion = 0;
  selectedPriority = 'medium';

  selectedCategory: number | null = null;
  showCompleted = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  onCategoryChange(category: number | null) {
    this.selectedCategory = category;
    console.log("Categoria selecionada:", category);
  }

  onShowCompletedChange(value: boolean) {
    this.showCompleted = value;
    console.log("Mostrar concluídas:", value);
  }

  createTask(task: any) {
    this.taskService.createTask(task).subscribe({
      next: (data) => {
        alert('Tarefa criada com sucesso');
        this.taskCreatedVersion++;
      },
      error: (error) => {
        alert('Erro ao criar tarefa');
      }
    })
  }

  createCategory(task: any) {
    this.categoryService.createCategory(task).subscribe({
      next: (data) => {
        alert('Categoria criada com sucesso');
        this.categoryCreatedVersion++;
      },
      error: (error) => {
        alert('Erro ao criar categoria');
      }
    })
  }
}