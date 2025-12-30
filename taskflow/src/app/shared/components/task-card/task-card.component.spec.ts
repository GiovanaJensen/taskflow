import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { By } from '@angular/platform-browser';
import { Tarefa } from '../../interfaces/Tarefa';

describe('TaskCardComponent (comportamento)', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const mockTask: Tarefa = {
      id: '1',
      title: 'Minha tarefa',
      description: 'Descrição teste',
      completed: false,
      priority: 'medium',
      categories: { name: 'Casa', icon: '🏠', color: 'red' },
      due_date: '2024-01-10',
      category_id: 1,
      created_at: '2025-12-10'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = JSON.parse(JSON.stringify(mockTask));
    fixture.detectChanges();
  });

  it('deve emitir toggleComplete quando o checkbox for acionado', () => {
    const emitSpy = jest.spyOn(component.toggleComplete, 'emit');

    const checkbox = fixture.debugElement.query(By.css('app-checkbox'));
    checkbox.triggerEventHandler('checkedChange', null);

    expect(emitSpy).toHaveBeenCalled();
  });

  it('deve formatar a data corretamente', () => {
    const formatted = component.formatDate('2024-01-10T12:00:00');
    expect(formatted).toBe('10/01/2024');
  });

  it('deve exibir a descrição quando ela existir', () => {
    const desc = fixture.debugElement.query(By.css('.task-description'));
    expect(desc).not.toBeNull();
    expect(desc.nativeElement.textContent.trim()).toBe(mockTask.description);
  });

  it('não deve exibir a descrição quando ela estiver vazia', () => {
    component.task.description = '';
    fixture.detectChanges();

    const desc = fixture.debugElement.query(By.css('.task-description'));
    expect(desc).toBeNull();
  });

  it('deve exibir o badge de categoria quando houver categorias', () => {
    const badge = fixture.debugElement.query(By.css('.badge-category'));
    expect(badge).not.toBeNull();
  });

  it('não deve exibir o badge de categoria quando não houver categorias', () => {
    component.task.categories = null;
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.badge-category'));
    expect(badge).toBeNull();
  });

  it('deve exibir o badge de data quando houver due_date', () => {
    const badge = fixture.debugElement.query(By.css('.badge-date'));
    expect(badge).not.toBeNull();
  });

  it('não deve exibir o badge de data quando não houver due_date', () => {
    component.task.due_date = null;
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.badge-date'));
    expect(badge).toBeNull();
  });

  it('deve exibir o texto correto da prioridade', () => {
    const priority = fixture.debugElement.query(By.css('.badge-priority'));
    expect(priority.nativeElement.textContent.trim()).toBe('Média');
  });

  it('deve aplicar a classe "completed" quando a tarefa estiver concluída', () => {
    component.task.completed = true;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.task-title'));
    expect(title.nativeElement.classList).toContain('completed');
  });

  it('não deve aplicar a classe "completed" quando a tarefa não estiver concluída', () => {
    component.task.completed = false;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.task-title'));
    expect(title.nativeElement.classList).not.toContain('completed');
  });
});