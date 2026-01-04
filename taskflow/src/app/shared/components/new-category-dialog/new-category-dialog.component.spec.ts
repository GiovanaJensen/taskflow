import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCategoryDialogComponent } from './new-category-dialog.component';
import { CategoryService } from '../../services/category.service';

describe('NewCategoryDialogComponent', () => {
  let component: NewCategoryDialogComponent;
  let fixture: ComponentFixture<NewCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCategoryDialogComponent],
      providers: [
        {
          provide: CategoryService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir openChange(false) ao chamar close()', () => {
    const emitSpy = jest.spyOn(component.openChange, 'emit');

    component.close();

    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('deve emitir submitCategory com nome e descrição', () => {
    const submitSpy = jest.spyOn(component.submitCategory, 'emit');
    const closeSpy = jest.spyOn(component, 'close');

    component.name = 'Trabalho';
    component.description = 'Categorias do trabalho';

    component.submit();

    expect(submitSpy).toHaveBeenCalledWith({
      name: 'Trabalho',
      description: 'Categorias do trabalho'
    });

    expect(closeSpy).toHaveBeenCalled();
  });

  it('deve emitir submitCategory com descrição null quando vazia', () => {
    const submitSpy = jest.spyOn(component.submitCategory, 'emit');

    component.name = 'Pessoal';
    component.description = '';

    component.submit();

    expect(submitSpy).toHaveBeenCalledWith({
      name: 'Pessoal',
      description: null
    });
  });

  it('deve resetar o formulário após submit', () => {
    component.name = 'Estudos';
    component.description = 'Faculdade';

    component.submit();

    expect(component.name).toBe('');
    expect(component.description).toBe('');
  });

  it('deve controlar isSubmitting durante o submit', () => {
    component.name = 'Teste';

    component.submit();

    expect(component.isSubmitting).toBe(false);
  });
});