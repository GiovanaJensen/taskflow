import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DropdownSubComponent } from './dropdown-sub.component';

@Component({
  template: `
    <app-dropdown-sub>
      teste
    </app-dropdown-sub>
  `,
  standalone: true,
  imports: [DropdownSubComponent],
})
class TestHostComponent {}

describe('DropdownSubComponent', () => {
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
    expect(labelEl.textContent).toContain('teste');
  });
});