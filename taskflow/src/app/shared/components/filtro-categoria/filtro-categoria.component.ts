import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { ButtonComponent } from "../button/button.component";
import { BadgeComponent } from "../badge/badget.component";
import { Categoria } from "../../interfaces/Categoria";
import { CategoryService } from "../../services/category.service";

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

  @Input() selectedCategory: number | null = null;
  @Input() showCompleted = false;

  @Output() selectedCategoryChange = new EventEmitter<number | null>();
  @Output() showCompletedChange = new EventEmitter<boolean>();

  categories: Categoria[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
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
    })
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

  toggleCompleted(value: boolean) {
    this.showCompletedChange.emit(value);
  }

  selectCategory(id: number | null) {
    this.selectedCategoryChange.emit(id);
  }
}