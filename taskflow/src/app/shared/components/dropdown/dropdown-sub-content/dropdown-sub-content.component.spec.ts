import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DropdownSubContentComponent } from './dropdown-sub-content.component';

describe('DropdownSubContentComponent', () => {
  let fixture: ComponentFixture<DropdownSubContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSubContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownSubContentComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve renderizar o shortcut', () => {
    const shortcut = fixture.debugElement.query(By.css('.dm-sub-content'));
    expect(shortcut).not.toBeNull();
  });

});