import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectTriggerComponent } from './select-trigger.component';
import { SelectComponent } from '../select.component';

describe('SelectTriggerComponent', () => {
  let component: SelectTriggerComponent;
  let fixture: ComponentFixture<SelectTriggerComponent>;
  let parentMock: {
    value: string | null;
    toggle: jest.Mock;
  };

  beforeEach(async () => {
    parentMock = {
      value: null,
      toggle: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SelectTriggerComponent],
      providers: [
        { provide: SelectComponent, useValue: parentMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir "Selecione..." quando não houver valor selecionado', () => {
    const text = fixture.debugElement.query(By.css('.trigger span')).nativeElement
      .textContent;

    expect(text.trim()).toBe('Selecione...');
  });

  it('deve exibir o valor selecionado quando parent.value estiver definido', () => {
    parentMock.value = 'Opção 1';
    fixture.detectChanges();

    const text = fixture.debugElement.query(By.css('.trigger span')).nativeElement
      .textContent;

    expect(text.trim()).toBe('Opção 1');
  });

  it('deve chamar parent.toggle ao clicar no trigger', () => {
    fixture.nativeElement.click();

    expect(parentMock.toggle).toHaveBeenCalled();
  });

});