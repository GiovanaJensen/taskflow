import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownShortcutComponent } from './dropdown-shortcut.component';

describe('DropdownShortcutComponent', () => {
  let fixture: ComponentFixture<DropdownShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownShortcutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownShortcutComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve renderizar o shortcut', () => {
    const shortcut = fixture.debugElement.query(By.css('.dm-shortcut'));
    expect(shortcut).not.toBeNull();
  });

});