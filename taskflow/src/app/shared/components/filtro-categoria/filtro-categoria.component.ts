import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { ButtonComponent } from "../button/button.component";
import { BadgeComponent } from "../badge/badget.component";
import { Categoria } from "../../interfaces/Categoria";

@Component({
  selector: 'app-filtro-categoria',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    ButtonComponent,
    BadgeComponent,
  ],
  templateUrl: './filtro-categoria.component.html',
  styleUrls: ['./filtro-categoria.component.scss']
})
export class FiltroCategoriaComponent implements OnInit {

  @Input() selectedCategory: string | null = null;
  @Input() showCompleted = false;

  @Output() selectedCategoryChange = new EventEmitter<string | null>();
  @Output() showCompletedChange = new EventEmitter<boolean>();

  categories: Categoria[] = [];
  taskCounts: Record<string, number> = {};

  ngOnInit() {
    this.loadMockCategories();
    this.loadMockTaskCounts();
  }

  loadMockCategories() {
    this.categories = [
      { id: '1', name: 'Trabalho', color: '#3b82f6', icon: '💼' },
      { id: '2', name: 'Pessoal',  color: '#ef4444', icon: '🏠' },
      { id: '3', name: 'Estudos',  color: '#22c55e', icon: '📚' }
    ];
  }

  loadMockTaskCounts() {
    this.taskCounts = {
      '1': 3,
      '2': 5,
      '3': 2
    };
  }

  totalCount() {
    return Object.values(this.taskCounts).reduce((a, b) => a + b, 0);
  }

  toggleCompleted(value: boolean) {
    this.showCompletedChange.emit(value);
  }

  selectCategory(id: string | null) {
    this.selectedCategoryChange.emit(id);
  }
}