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
    SelectItemComponent
]
})
export class HomeComponent {
  openDialog = false;
  selectedPriority = 'medium';

  selectedCategory: string | null = null;
  showCompleted = false;

  onCategoryChange(category: string | null) {
    this.selectedCategory = category;
    console.log("Categoria selecionada:", category);
  }

  onShowCompletedChange(value: boolean) {
    this.showCompleted = value;
    console.log("Mostrar concluídas:", value);
  }
}