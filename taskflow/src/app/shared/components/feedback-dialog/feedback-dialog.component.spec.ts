import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeedbackDialogComponent } from './feedback-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';

describe('FeedbackDialogComponent', () => {
  let fixture: ComponentFixture<FeedbackDialogComponent>;
  let component: FeedbackDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve repassar o estado open para o DialogComponent', () => {
    component.open = true;
    fixture.detectChanges();

    const dialog = fixture.debugElement.query(
      By.directive(DialogComponent)
    ).componentInstance as DialogComponent;

    expect(dialog.open).toBe(true);
  });

  it('deve emitir openChange quando o dialog emitir openChange', () => {
    const emitSpy = jest.spyOn(component.openChange, 'emit');

    const dialog = fixture.debugElement.query(
      By.directive(DialogComponent)
    ).componentInstance as DialogComponent;

    dialog.openChange.emit(false);

    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('deve definir imagem e título de sucesso quando type for success', () => {
    component.type = 'success';
    component.open = true;

    component.ngOnChanges({
      open: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.title).toBe('Sucesso!');
    expect(component.img).toContain('success');
  });

  it('deve definir imagem e título de erro quando type for error', () => {
    component.type = 'error';
    component.open = true;

    component.ngOnChanges({
      open: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.title).toBe('Erro!');
    expect(component.img).toContain('error');
  });

  it('deve renderizar título, descrição e imagem corretamente', () => {
    component.open = true;
    component.type = 'success';
    component.description = 'Operação realizada com sucesso';

    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h1'));
    const description = fixture.debugElement.query(By.css('h2'));
    const img = fixture.debugElement.query(By.css('img'));

    expect(title.nativeElement.textContent).toContain('Sucesso');
    expect(description.nativeElement.textContent).toContain('Operação realizada');
    expect(img.nativeElement.getAttribute('src')).toContain('success');
  });

  it('deve emitir openChange false ao chamar close()', () => {
    const emitSpy = jest.spyOn(component.openChange, 'emit');

    component.close();

    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});