import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownCheckboxItemComponent } from './dropdown-checkbox-item.component';
import { DropdownRootComponent } from '../dropdown-root/dropdown-root.component';

class MockDropdownRootComponent {
  registerItem = jest.fn();
  unregisterItem = jest.fn();
}

describe('DropdownCheckboxItemComponent', () => {
  let fixture: ComponentFixture<DropdownCheckboxItemComponent>;
  let component: DropdownCheckboxItemComponent;

  describe('sem dropdown (uso isolado)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DropdownCheckboxItemComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DropdownCheckboxItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve renderizar o conteúdo projetado', () => {
      const content = fixture.debugElement.query(By.css('.dm-checkbox-content'));
      expect(content).not.toBeNull();
    });

    it('deve alternar o valor de checked ao clicar', () => {
      component.checked = false;
      fixture.detectChanges();

      const item = fixture.debugElement.query(By.css('.dm-item'));
      item.triggerEventHandler('click', new Event('click'));

      expect(component.checked).toBe(true);
    });

    it('deve emitir checkedChange ao clicar', () => {
      const emitSpy = jest.spyOn(component.checkedChange, 'emit');

      const item = fixture.debugElement.query(By.css('.dm-item'));
      item.triggerEventHandler('click', new Event('click'));

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('deve aplicar a classe checked no indicador quando checked for true', () => {
      component.checked = true;
      fixture.detectChanges();

      const indicator = fixture.debugElement.query(
        By.css('.dm-checkbox-indicator')
      );

      expect(indicator.nativeElement.classList).toContain('checked');
    });

    it('deve chamar stopPropagation no evento de clique', () => {
      const event = new Event('click');
      const stopSpy = jest.spyOn(event, 'stopPropagation');

      component.toggle(event);

      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('com dropdown (integração)', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DropdownCheckboxItemComponent],
        providers: [
          {
            provide: DropdownRootComponent,
            useClass: MockDropdownRootComponent,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DropdownCheckboxItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('deve registrar o item no dropdown ao iniciar', () => {
      const dropdown = TestBed.inject(
        DropdownRootComponent
      ) as unknown as MockDropdownRootComponent;

      expect(dropdown.registerItem).toHaveBeenCalledWith(
        fixture.nativeElement
      );
    });

    it('deve remover o item do dropdown ao destruir', () => {
      const dropdown = TestBed.inject(
        DropdownRootComponent
      ) as unknown as MockDropdownRootComponent;

      fixture.destroy();

      expect(dropdown.unregisterItem).toHaveBeenCalledWith(
        fixture.nativeElement
      );
    });
  });
});