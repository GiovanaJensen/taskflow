import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownItemComponent } from './dropdown-item.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

class MockDropdownRootComponent {
  items: HTMLElement[] = [];
  closeOnSelect = true;

  registerItem = jest.fn((el: HTMLElement) => {
    this.items.push(el);
  });

  unregisterItem = jest.fn((el: HTMLElement) => {
    this.items = this.items.filter(i => i !== el);
  });

  close = jest.fn();
}

@Component({
  template: `
    <app-dropdown-item [value]="itemValue" (select)="onSelect($event)">
      Item de teste
    </app-dropdown-item>
  `,
  standalone: true,
  imports: [DropdownItemComponent]
})
class TestHostComponent {
  itemValue = 'teste';
  onSelect = jest.fn();
}

describe('DropdownItemComponent', () => {
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

    contentEl = document.querySelector('.dm-item') as HTMLElement;
  });

  it('deve registrar o item no dropdown ao iniciar', () => {
    expect(dropdown.registerItem).toHaveBeenCalled();
    expect(dropdown.items.length).toBe(1);
  });

  it('deve remover o item do dropdown ao destruir', () => {
    fixture.destroy();
    expect(dropdown.unregisterItem).toHaveBeenCalled();
  });

  it('deve emitir o valor ao clicar', () => {
    const item = fixture.debugElement.query(By.css('.dm-item'));
    item.triggerEventHandler('click', new MouseEvent('click'));

    const host = fixture.componentInstance;
    expect(host.onSelect).toHaveBeenCalledWith('teste');
  });

  it('deve fechar o dropdown ao selecionar quando closeOnSelect for true', () => {
    const item = fixture.debugElement.query(By.css('.dm-item'));
    item.triggerEventHandler('click', new MouseEvent('click'));

    expect(dropdown.close).toHaveBeenCalled();
  });

  it('não deve fechar o dropdown quando closeOnSelect for false', () => {
    dropdown.closeOnSelect = false;

    const item = fixture.debugElement.query(By.css('.dm-item'));
    item.triggerEventHandler('click', new MouseEvent('click'));

    expect(dropdown.close).not.toHaveBeenCalled();
  });

  it('deve selecionar ao pressionar Enter', () => {
    const item = fixture.debugElement.query(By.css('.dm-item'));
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    item.triggerEventHandler('keydown', event);

    const host = fixture.componentInstance;
    expect(host.onSelect).toHaveBeenCalledWith('teste');
  });

  it('deve selecionar ao pressionar Espaço', () => {
    const item = fixture.debugElement.query(By.css('.dm-item'));
    const event = new KeyboardEvent('keydown', { key: ' ' });

    item.triggerEventHandler('keydown', event);

    const host = fixture.componentInstance;
    expect(host.onSelect).toHaveBeenCalledWith('teste');
  });

  it('não deve selecionar ao pressionar outra tecla', () => {
    const item = fixture.debugElement.query(By.css('.dm-item'));
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

    item.triggerEventHandler('keydown', event);

    const host = fixture.componentInstance;
    expect(host.onSelect).not.toHaveBeenCalled();
  });
});