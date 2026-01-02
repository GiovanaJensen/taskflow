import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownLabelComponent } from './dropdown-label.component';

@Component({
  template: `
    <app-dropdown-label>
      Label de teste
    </app-dropdown-label>
  `,
  standalone: true,
  imports: [DropdownLabelComponent],
})
class TestHostComponent {}

describe('DropdownLabelComponent', () => {
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

  it('deve renderizar o wrapper com a classe dm-label', () => {
    const labelEl = fixture.debugElement.query(By.css('.dm-label'));
    expect(labelEl).toBeTruthy();
  });

  it('deve projetar o conteúdo corretamente', () => {
    const labelEl = fixture.debugElement.query(By.css('.dm-label')).nativeElement;
    expect(labelEl.textContent).toContain('Label de teste');
  });
});