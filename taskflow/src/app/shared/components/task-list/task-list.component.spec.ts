import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of, throwError } from 'rxjs';
import { Tarefa } from '../../interfaces/Tarefa';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jest.Mocked<TaskService>;

  const mockTasks: Tarefa[] = [
    { id: '1', title: 'Task 1', completed: false, category_id: 1 } as Tarefa,
    { id: '2', title: 'Task 2', completed: true, category_id: 1 } as Tarefa,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getAll: jest.fn(),
            getByCategory: jest.fn(),
            finishTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jest.Mocked<TaskService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar tarefas no ngOnInit', () => {
    taskService.getAll.mockReturnValue(of(mockTasks));

    component.ngOnInit();

    expect(taskService.getAll).toHaveBeenCalled();
    expect(component.tasks.length).toBe(2);
    expect(component.isLoading).toBe(false);
  });

  it('deve chamar loadTasks quando taskCreated mudar', () => {
    const loadSpy = jest.spyOn(component, 'loadTasks');

    taskService.getAll.mockReturnValue(
        of([]) 
    );

    component.ngOnChanges({
        taskCreated: {
        currentValue: 1,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false
        }
    });

    expect(loadSpy).toHaveBeenCalled();
  });

  it('pendingTasks deve retornar apenas tarefas pendentes', () => {
    component.tasks = mockTasks;

    expect(component.pendingTasks.length).toBe(1);
    expect(component.pendingTasks[0].completed).toBe(false);
  });

  it('completedTasks deve retornar apenas tarefas concluídas', () => {
    component.tasks = mockTasks;

    expect(component.completedTasks.length).toBe(1);
    expect(component.completedTasks[0].completed).toBe(true);
  });

  it('toggleComplete deve inverter o status da tarefa no sucesso', () => {
    const task = { ...mockTasks[0] };

    taskService.finishTask.mockReturnValue(
        of({} as any)
    );

    component.toggleComplete(task);

    expect(taskService.finishTask).toHaveBeenCalledWith({
        id: Number(task.id),
        isCompleted: true,
    });

    expect(task.completed).toBe(true);
  });

  it('toggleComplete deve abrir feedback em caso de erro', () => {
    const task = { ...mockTasks[0] };
    taskService.finishTask.mockReturnValue(throwError(() => 'erro'));

    component.toggleComplete(task);

    expect(component.openFeedbackDialog).toBe(true);
    expect(component.typeDialog).toBe('error');
  });

  it('deleteTask deve remover a tarefa no sucesso', () => {
    component.tasks = [...mockTasks];

    taskService.deleteTask.mockReturnValue(
        of('ok')
    );

    component.deleteTask('1');

    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
    expect(component.tasks.length).toBe(1);
  });

  it('deleteTask deve abrir feedback em caso de erro', () => {
    taskService.deleteTask.mockReturnValue(throwError(() => 'erro'));

    component.deleteTask('1');

    expect(component.openFeedbackDialog).toBe(true);
    expect(component.typeDialog).toBe('error');
  });
});