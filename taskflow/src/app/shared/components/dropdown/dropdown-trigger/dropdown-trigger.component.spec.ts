import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownTriggerComponent } from './dropdown-trigger.component';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

class MockDropdownRootComponent {
  open = false;
  items: HTMLElement[] = [document.createElement('button')];

  toggle = jest.fn(() => {
    this.open = !this.open;
  });

  setOpen = jest.fn((value: boolean) => {
    this.open = value;
  });
}

@Component({
  template: `
    <app-dropdown-trigger>
      Abrir
    </app-dropdown-trigger>
  `,
  standalone: true,
  imports: [DropdownTriggerComponent]
})
class TestHostComponent {}

describe('DropdownTriggerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let dropdown: MockDropdownRootComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: DropdownRootComponent, useClass: MockDropdownRootComponent }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    dropdown = TestBed.inject(DropdownRootComponent) as unknown as MockDropdownRootComponent;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const trigger = fixture.debugElement.query(By.css('.dm-trigger'));
    expect(trigger).toBeTruthy();
  });

  it('deve chamar toggle ao clicar', () => {
    const trigger = fixture.debugElement.query(By.css('.dm-trigger'));

    trigger.triggerEventHandler('click', new MouseEvent('click'));

    expect(dropdown.toggle).toHaveBeenCalled();
  });

  it('não deve chamar toggle quando estiver desabilitado', () => {
    const triggerCmp = fixture.debugElement.query(
      By.directive(DropdownTriggerComponent)
    ).componentInstance as DropdownTriggerComponent;

    triggerCmp.disabled = true;
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.dm-trigger'));
    trigger.triggerEventHandler('click', new MouseEvent('click'));

    expect(dropdown.toggle).not.toHaveBeenCalled();
  });

  it('deve abrir o dropdown ao pressionar Enter', () => {
    const host = fixture.debugElement.query(
        By.directive(DropdownTriggerComponent)
    );

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    host.nativeElement.dispatchEvent(event);

    expect(dropdown.setOpen).toHaveBeenCalledWith(true);
  });

  it('deve abrir o dropdown ao pressionar ArrowDown', () => {
    const host = fixture.debugElement.query(
        By.directive(DropdownTriggerComponent)
    );

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    host.nativeElement.dispatchEvent(event);

    expect(dropdown.setOpen).toHaveBeenCalledWith(true);
  });

  it('deve refletir o estado do dropdown no aria-expanded', () => {
    dropdown.open = true;
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('.dm-trigger'));
    expect(trigger.attributes['aria-expanded']).toBe('true');
  });
});