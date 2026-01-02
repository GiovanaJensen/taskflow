import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownRootComponent } from './dropdown-root.component';

@Component({
  template: `
    <app-dropdown>
      <app-dropdown-trigger>Trigger</app-dropdown-trigger>

      <app-dropdown-content>
        Conteúdo do dropdown
      </app-dropdown-content>
    </app-dropdown>
  `,
  standalone: true,
  imports: [DropdownRootComponent],
})
class TestHostComponent {}

describe('DropdownRootComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let dropdown: DropdownRootComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);

    dropdown = fixture.debugElement.query(
      By.directive(DropdownRootComponent)
    ).componentInstance as DropdownRootComponent;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(dropdown).toBeTruthy();
  });

  it('deve iniciar fechado', () => {
    expect(dropdown.open).toBe(false);
  });

  it('deve alternar o estado ao chamar toggle()', () => {
    dropdown.toggle();
    expect(dropdown.open).toBe(true);

    dropdown.toggle();
    expect(dropdown.open).toBe(false);
  });

  it('deve emitir openChange ao abrir', () => {
    const spy = jest.spyOn(dropdown.openChange, 'emit');

    dropdown.setOpen(true);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('deve emitir openChange ao fechar', () => {
    const spy = jest.spyOn(dropdown.openChange, 'emit');

    dropdown.setOpen(false);

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('deve fechar o dropdown ao chamar close()', () => {
    dropdown.setOpen(true);
    dropdown.close();

    expect(dropdown.open).toBe(false);
  });

  it('deve aplicar a classe "open" no host quando aberto', () => {
    dropdown.setOpen(true);
    fixture.detectChanges();

    const hostEl = fixture.debugElement.query(
      By.directive(DropdownRootComponent)
    ).nativeElement as HTMLElement;

    expect(hostEl.classList).toContain('open');
  });

  it('não deve renderizar o conteúdo quando fechado', () => {
    const content = fixture.debugElement.query(
      By.css('app-dropdown-content')
    );

    expect(content).toBeNull();
  });

  it('deve renderizar o conteúdo quando aberto', () => {
    dropdown.setOpen(true);
    fixture.detectChanges();

    const content = fixture.debugElement.query(
      By.css('app-dropdown-content')
    );

    expect(content).not.toBeNull();
  });

  it('deve registrar um item', () => {
    const el = document.createElement('div');

    dropdown.registerItem(el);

    expect(dropdown.items).toContain(el);
  });

  it('não deve duplicar itens registrados', () => {
    const el = document.createElement('div');

    dropdown.registerItem(el);
    dropdown.registerItem(el);

    expect(dropdown.items.length).toBe(1);
  });

  it('deve remover um item', () => {
    const el = document.createElement('div');

    dropdown.registerItem(el);
    dropdown.unregisterItem(el);

    expect(dropdown.items).not.toContain(el);
  });
});