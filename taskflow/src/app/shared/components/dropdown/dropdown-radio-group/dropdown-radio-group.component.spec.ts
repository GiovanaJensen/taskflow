import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownRadioGroupComponent } from './dropdown-radio-group.component';

@Component({
  template: `
    <app-dropdown-radio-group>
      Label de teste
    </app-dropdown-radio-group>
  `,
  standalone: true,
  imports: [DropdownRadioGroupComponent],
})
class TestHostComponent {}

describe('DropdownRadioGroupComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('deve projetar o conteúdo corretamente', () => {
    const labelEl = fixture.debugElement.nativeElement;
    expect(labelEl.textContent).toContain('Label de teste');
  });
});