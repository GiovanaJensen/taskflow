import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DropdownSubTriggerComponent } from './dropdown-sub-trigger.component';

@Component({
  template: `
    <app-dropdown-sub-trigger>
      Submenu
    </app-dropdown-sub-trigger>
  `,
  standalone: true,
  imports: [DropdownSubTriggerComponent],
})
class TestHostComponent {}

describe('DropdownSubTriggerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const component = fixture.debugElement.query(
      By.directive(DropdownSubTriggerComponent)
    );
    expect(component).toBeTruthy();
  });

  it('deve renderizar a classe sub-trigger', () => {
    const el = fixture.debugElement.query(By.css('.sub-trigger'));
    expect(el).not.toBeNull();
  });

  it('deve renderizar o conteúdo projetado', () => {
    const el = fixture.debugElement.query(By.css('.sub-trigger'));
    expect(el.nativeElement.textContent).toContain('Submenu');
  });

  it('deve renderizar o caret', () => {
    const caret = fixture.debugElement.query(By.css('.caret'));
    expect(caret).not.toBeNull();
    expect(caret.nativeElement.textContent).toContain('->');
  });
});