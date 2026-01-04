import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar fechado', () => {
    expect(component.open).toBe(false);
  });

  it('deve alternar o estado de open ao chamar toggle()', () => {
    component.toggle();
    expect(component.open).toBe(true);

    component.toggle();
    expect(component.open).toBe(false);
  });

  it('deve selecionar um valor, emitir valueChange e fechar o dropdown', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');

    component.open = true;

    component.selectValue('opcao-1');

    expect(component.value).toBe('opcao-1');
    expect(emitSpy).toHaveBeenCalledWith('opcao-1');
    expect(component.open).toBe(false);
  });
});