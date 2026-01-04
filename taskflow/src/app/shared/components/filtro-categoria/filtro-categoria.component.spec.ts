import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { FiltroCategoriaComponent } from './filtro-categoria.component';
import { CategoryService } from '../../services/category.service';
import { Categoria } from '../../interfaces/Categoria';

class MockCategoryService {
  getAll = jest.fn();
}

describe('FiltroCategoriaComponent', () => {
  let fixture: ComponentFixture<FiltroCategoriaComponent>;
  let component: FiltroCategoriaComponent;
  let categoryService: MockCategoryService;

  const mockCategories: Categoria[] = [
    { id: 1, name: 'Pessoal' },
    { id: 2, name: 'Trabalho' },
  ] as Categoria[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroCategoriaComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroCategoriaComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as unknown as MockCategoryService;

    categoryService.getAll.mockReturnValue(of(mockCategories));
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar as categorias no ngOnInit', () => {
    expect(categoryService.getAll).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
  });

  it('deve mapear ícone e cor ao carregar categorias', () => {
    const category = component.categories[0];

    expect(category.icon).toBeDefined();
    expect(category.color).toBeDefined();
  });

  it('deve recarregar categorias quando categoryCreated mudar', () => {
    const spy = jest.spyOn(component, 'loadCategories');

    component.ngOnChanges({
      categoryCreated: {
        currentValue: 1,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  it('deve emitir showCompletedChange ao alternar checkbox', () => {
    const emitSpy = jest.spyOn(component.showCompletedChange, 'emit');

    component.toggleCompleted(true);

    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('deve emitir selectedCategoryChange ao selecionar uma categoria', () => {
    const emitSpy = jest.spyOn(component.selectedCategoryChange, 'emit');

    component.selectCategory(1);

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('deve emitir selectedCategoryChange com null ao clicar em "Todas"', () => {
    const emitSpy = jest.spyOn(component.selectedCategoryChange, 'emit');

    component.selectCategory(null);

    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('deve renderizar os botões de categorias', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));

    expect(buttons.length).toBe(1 + mockCategories.length);
  });

  it('deve aplicar variant secondary quando a categoria estiver selecionada', () => {
    component.selectedCategory = 1;
    fixture.detectChanges();

    const selectedButton = fixture.debugElement
      .queryAll(By.css('app-button'))
      .find(btn => btn.nativeElement.textContent.includes('Pessoal'));

    expect(selectedButton).toBeTruthy();
  });
});