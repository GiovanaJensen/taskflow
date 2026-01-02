import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownContentComponent } from './dropdown-content.component';
import { Component } from '@angular/core';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

class MockDropdownRootComponent {
  open = false;
  items: HTMLElement[] = [];
  host = {
    nativeElement: document.createElement('div')
  };

  registerItem = jest.fn((el: HTMLElement) => {
    this.items.push(el);
  });

  close = jest.fn();
}

@Component({
  template: `
    <app-dropdown-content>
      <div class="dm-item" role="menuitem" tabindex="-1">Item 1</div>
      <div class="dm-item" role="menuitem" tabindex="-1">Item 2</div>
    </app-dropdown-content>
  `,
  standalone: true,
  imports: [DropdownContentComponent]
})
class TestHostComponent {}

describe('DropdownContentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let dropdown: MockDropdownRootComponent;
  let contentEl: HTMLElement;

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

    contentEl = document.querySelector('.dm-content') as HTMLElement;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('deve criar o componente', () => {
    expect(contentEl).toBeTruthy();
  });

  it('deve criar o portal no body', () => {
    const portal = document.querySelector('.dm-portal');
    expect(portal).not.toBeNull();
  });

  it('deve esconder o conteúdo quando dropdown estiver fechado', () => {
    dropdown.open = false;
    fixture.detectChanges();

    expect(contentEl.style.display).toBe('none');
  });

  it('deve exibir o conteúdo quando dropdown estiver aberto', () => {
    dropdown.open = true;
    fixture.detectChanges();

    expect(contentEl.style.display).toBe('block');
  });

  it('deve registrar os itens no dropdown ao abrir', () => {
    dropdown.open = true;
    fixture.detectChanges();

    expect(dropdown.registerItem).toHaveBeenCalled();
    expect(dropdown.items.length).toBeGreaterThan(0);
  });

  it('deve fechar o dropdown ao clicar fora', () => {
    const event = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(event);

    expect(dropdown.close).toHaveBeenCalled();
  });

  it('deve fechar ao pressionar Escape', () => {
    dropdown.open = true;
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    contentEl.dispatchEvent(event);

    expect(dropdown.close).toHaveBeenCalled();
  });

  it('deve navegar entre itens com ArrowDown', () => {
    dropdown.open = true;
    fixture.detectChanges();

    expect(dropdown.items.length).toBeGreaterThan(1);

    dropdown.items[0].focus();
    expect(document.activeElement).toBe(dropdown.items[0]);

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    contentEl.dispatchEvent(event);

    expect(document.activeElement).toBe(dropdown.items[1]);
  });

  it('deve remover o portal ao destruir o componente', () => {
    fixture.destroy();
    const portal = document.querySelector('.dm-portal');
    expect(portal).toBeNull();
  });
});