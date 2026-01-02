import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownSeparatorComponent } from './dropdown-separator.component';

describe('DropdownSeparatorComponent', () => {
  let fixture: ComponentFixture<DropdownSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSeparatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownSeparatorComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve renderizar o separador', () => {
    const separator = fixture.debugElement.query(By.css('.dm-sep'));
    expect(separator).not.toBeNull();
  });

  it('deve possuir role="separator"', () => {
    const separator = fixture.debugElement.query(By.css('.dm-sep'));
    expect(separator.attributes['role']).toBe('separator');
  });
});