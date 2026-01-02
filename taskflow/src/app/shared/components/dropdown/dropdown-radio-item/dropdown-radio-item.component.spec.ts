import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownRadioItemComponent } from './dropdown-radio-item.component';
import { DropdownRadioGroupComponent } from '../dropdown-radio-group/dropdown-radio-group.component';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

class MockRadioGroupComponent {
  value: any = null;
  setValue = jest.fn((val: any) => {
    this.value = val;
  });
}

class MockDropdownRootComponent {
  closeOnSelect = true;
  registerItem = jest.fn();
  close = jest.fn();
}

@Component({
  template: `
    <app-dropdown-radio-item [value]="itemValue">
      Item rádio
    </app-dropdown-radio-item>
  `,
  standalone: true,
  imports: [DropdownRadioItemComponent]
})
class TestHostComponent {
  itemValue = 'option-1';
}

describe('DropdownRadioItemComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let group: MockRadioGroupComponent;
  let dropdown: MockDropdownRootComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: DropdownRadioGroupComponent, useClass: MockRadioGroupComponent },
        { provide: DropdownRootComponent, useClass: MockDropdownRootComponent },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    group = TestBed.inject(DropdownRadioGroupComponent) as unknown as MockRadioGroupComponent;
    dropdown = TestBed.inject(DropdownRootComponent) as unknown as MockDropdownRootComponent;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('deve registrar o item no dropdown ao iniciar', () => {
    expect(dropdown.registerItem).toHaveBeenCalled();
  });

  it('deve chamar setValue no grupo ao clicar', () => {
    const item = fixture.debugElement.query(By.css('.dm-radio'));
    item.triggerEventHandler('click', null);

    expect(group.setValue).toHaveBeenCalledWith('option-1');
  });

  it('deve fechar o dropdown ao selecionar quando closeOnSelect for true', () => {
    const item = fixture.debugElement.query(By.css('.dm-radio'));
    item.triggerEventHandler('click', null);

    expect(dropdown.close).toHaveBeenCalled();
  });

  it('deve aplicar a classe checked quando o valor do grupo for igual ao value', () => {
    group.value = 'option-1';
    fixture.detectChanges();

    const indicator = fixture.debugElement.query(By.css('.dm-radio-indicator'));
    expect(indicator.nativeElement.classList).toContain('checked');
  });

  it('não deve aplicar a classe checked quando o valor for diferente', () => {
    group.value = 'option-2';
    fixture.detectChanges();

    const indicator = fixture.debugElement.query(By.css('.dm-radio-indicator'));
    expect(indicator.nativeElement.classList).not.toContain('checked');
  });
});