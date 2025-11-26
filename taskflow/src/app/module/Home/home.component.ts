import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FiltroCategoriaComponent } from "../../shared/components/filtro-categoria/filtro-categoria.component";
import { Tarefa } from "../../shared/interfaces/Tarefa";
import { TaskListComponent } from "../../shared/components/task-list/task-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    FiltroCategoriaComponent,
    TaskListComponent
]
})
export class HomeComponent {

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