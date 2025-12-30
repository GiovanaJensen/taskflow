import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsListComponent } from './tabs-list.component';

@Component({
  template: `
    <app-tabs-list>
      <button class="tab-btn">Aba 1</button>
      <button class="tab-btn">Aba 2</button>
    </app-tabs-list>
  `,
  standalone: true,
  imports: [TabsListComponent],
})
class HostComponent {}

describe('TabsListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('deve renderizar o container .tabs-list', () => {
    const container = fixture.debugElement.query(By.css('.tabs-list'));
    expect(container).not.toBeNull();
  });

  it('deve projetar o conteúdo interno', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.tab-btn'));
    expect(buttons.length).toBe(2);
  });
});