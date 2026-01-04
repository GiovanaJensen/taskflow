import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectContentComponent } from './select-content.component';

describe('SelectContentComponent', () => {
  let component: SelectContentComponent;
  let fixture: ComponentFixture<SelectContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve aceitar valor no input selected', () => {
    component.selected = 'item-1';
    fixture.detectChanges();

    expect(component.selected).toBe('item-1');
  });

  it('deve emitir selectItem com o valor selecionado', () => {
    const emitSpy = jest.spyOn(component.selectItem, 'emit');

    component.selectItem.emit('item-2');

    expect(emitSpy).toHaveBeenCalledWith('item-2');
  });
});