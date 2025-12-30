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
import { FeedbackDialogComponent } from "../../shared/components/feedback-dialog/feedback-dialog.component";

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
    NewCategoryDialogComponent,
    FeedbackDialogComponent
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

  openFeedbackDialog = false;
  descriptionkDialog = '';
  typeDialog: "error" | "warning" | "success" = "success";

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
        this.openFeedbackDialog = true;
        this.descriptionkDialog = `Sucesso ao criar a tarefa!`;
        this.typeDialog = 'success';
        this.taskCreatedVersion++;
      },
      error: (error) => {
        this.openFeedbackDialog = true;
        this.descriptionkDialog = `Erro ao criar a tarefa! ${error}`;
        this.typeDialog = 'error';
      }
    })
  }

  createCategory(task: any) {
    this.categoryService.createCategory(task).subscribe({
      next: (data) => {
        this.openFeedbackDialog = true;
        this.descriptionkDialog = `Sucesso ao criar a categoria!`;
        this.typeDialog = 'success';
        this.categoryCreatedVersion++;
      },
      error: (error) => {
        this.openFeedbackDialog = true;
        this.descriptionkDialog = `Erro ao criar a categoria! ${error}`;
        this.typeDialog = 'error';
      }
    })
  }
}