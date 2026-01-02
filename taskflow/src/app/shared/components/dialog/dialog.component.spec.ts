import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DialogComponent } from './dialog.component';
import { Component } from '@angular/core';
import { DialogFooter } from './dialog-footer/dialog-footer.component';
import { DialogTitle } from './dialog-title/dialog-title.component';
import { DialogDescription } from './dialog-description/dialog-description.component';

@Component({
  template: `
    <app-dialog [(open)]="open">
      <button dialogTrigger>Abrir dialog</button>

      <app-dialog-title>Título</app-dialog-title>
      <app-dialog-description>Descrição</app-dialog-description>

      <p class="dialog-body-content">Conteúdo principal</p>

      <app-dialog-footer>
        <button>Salvar</button>
      </app-dialog-footer>
    </app-dialog>
  `,
  standalone: true,
  imports: [DialogComponent, DialogFooter, DialogTitle, DialogDescription],
})
class TestHostComponent {
  open = false;
}

describe('DialogComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('não deve exibir o dialog quando open for false', () => {
    const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
    const container = fixture.debugElement.query(By.css('.dialog-container'));

    expect(overlay).toBeNull();
    expect(container).toBeNull();
  });

  it('deve fechar o dialog ao clicar no botão de fechar', () => {
    host.open = true;
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.dialog-close'));
    closeButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(host.open).toBe(false);
  });

  it('deve fechar o dialog ao clicar no overlay', () => {
    host.open = true;
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.dialog-overlay'));
    overlay.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(host.open).toBe(false);
  });

  it('deve renderizar o conteúdo projetado', () => {
    host.open = true;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('app-dialog-title'));
    const description = fixture.debugElement.query(By.css('app-dialog-description'));
    const body = fixture.debugElement.query(By.css('.dialog-body-content'));
    const footer = fixture.debugElement.query(By.css('app-dialog-footer'));

    expect(title).not.toBeNull();
    expect(description).not.toBeNull();
    expect(body).not.toBeNull();
    expect(footer).not.toBeNull();
  });
});