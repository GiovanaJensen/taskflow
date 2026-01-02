import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o botão com role checkbox', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).not.toBeNull();
    expect(button.attributes['role']).toBe('checkbox');
  });

  it('não deve renderizar o ícone quando não estiver marcado', () => {
    component.checked = false;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.icon'));
    expect(icon).toBeNull();
  });

  it('deve renderizar o ícone quando estiver marcado', () => {
    component.checked = true;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.icon'));
    expect(icon).not.toBeNull();
  });

  it('deve aplicar a classe checked quando checked for true', () => {
    component.checked = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.classList).toContain('checked');
  });

  it('deve alternar o estado ao clicar', () => {
    component.checked = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.checked).toBe(true);
  });

  it('deve emitir checkedChange ao clicar', () => {
    const emitSpy = jest.spyOn(component.checkedChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('não deve alternar nem emitir quando estiver desabilitado', () => {
    component.disabled = true;
    component.checked = false;
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.checkedChange, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.checked).toBe(false);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('deve atualizar o valor ao usar writeValue', () => {
    component.writeValue(true);
    fixture.detectChanges();

    expect(component.checked).toBe(true);
  });

  it('deve atualizar o estado disabled ao usar setDisabledState', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
  });
});