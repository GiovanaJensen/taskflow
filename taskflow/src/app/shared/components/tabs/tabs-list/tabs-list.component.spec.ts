import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsListComponent } from './tabs-list.component';

@Component({
  template: `
    <app-tabs-list>
      <button class="tab-button">Aba 1</button>
    </app-tabs-list>
  `,
  standalone: true,
  imports: [TabsListComponent],
})
class TestHostComponent {}

describe('TabsListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('deve renderizar o conteúdo projetado', () => {
    const button = fixture.debugElement.query(By.css('.tab-button'));
    expect(button).not.toBeNull();
  });
});