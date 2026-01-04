import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectItemComponent } from './select-item.component';
import { SelectComponent } from '../select.component';

describe('SelectItemComponent', () => {
  let component: SelectItemComponent;
  let fixture: ComponentFixture<SelectItemComponent>;
  let parentMock: {
    value: string | null;
    selectValue: jest.Mock;
  };

  beforeEach(async () => {
    parentMock = {
      value: null,
      selectValue: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SelectItemComponent],
      providers: [
        { provide: SelectComponent, useValue: parentMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectItemComponent);
    component = fixture.componentInstance;
    component.value = 'Item 1';
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar selectValue no componente pai ao clicar', () => {
    const item = fixture.debugElement.query(By.css('.item'));

    item.triggerEventHandler('click', null);

    expect(parentMock.selectValue).toHaveBeenCalledWith('Item 1');
  });

  it('selected deve ser false quando o valor não estiver selecionado', () => {
    parentMock.value = 'Outro valor';
    fixture.detectChanges();

    expect(component.selected).toBe(false);
  });

  it('selected deve ser true quando o valor estiver selecionado', () => {
    parentMock.value = 'Item 1';
    fixture.detectChanges();

    expect(component.selected).toBe(true);
  });
});