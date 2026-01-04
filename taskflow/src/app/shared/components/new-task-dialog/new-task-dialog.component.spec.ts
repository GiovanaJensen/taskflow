import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NewTaskDialogComponent } from "./new-task-dialog.component"
import { TaskService } from "../../services/task.service";
import { CategoryService } from "../../services/category.service";

describe('NewTaskDialogComponent', () => {
    let component: NewTaskDialogComponent;
    let fixture: ComponentFixture<NewTaskDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewTaskDialogComponent],
            providers: [
                {
                    provide: CategoryService,
                    useValue: {}
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NewTaskDialogComponent);
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

    it('deve emitir submitTask com título, descrição, cateoria, prioridade e data', () => {
        const submitSpy = jest.spyOn(component.submitTask, 'emit');
        const closeSpy = jest.spyOn(component, 'close');

        component.categories = [
            {
            id: 1,
            name: 'Trabalho',
            icon: '💼',
            color: '#3b82f6'
            }
        ];

        component.title = 'Task de teste';
        component.description = 'descrição';
        component.categoryId = 'Trabalho';
        component.priority = 'baixa';
        component.dueDate = '2025-08-10';

        component.submit();

        expect(submitSpy).toHaveBeenCalledWith({
            title: 'Task de teste',
            description: 'descrição',
            categoryId: 1,
            taskPriority: 1,
            dueDate: new Date('2025-08-10').toISOString()
        });

        expect(closeSpy).toHaveBeenCalled();
    })
})