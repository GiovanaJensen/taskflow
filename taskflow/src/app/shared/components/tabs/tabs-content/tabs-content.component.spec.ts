import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent } from '../tabs.component';
import { TabsContentComponent } from './tabs-content.component';

@Component({
  template: `
    <app-tabs [defaultValue]="'tab1'">
      <app-tabs-content value="tab1">
        <p class="content-1">Conteúdo Aba 1</p>
      </app-tabs-content>

      <app-tabs-content value="tab2">
        <p class="content-2">Conteúdo Aba 2</p>
      </app-tabs-content>
    </app-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabsContentComponent],
})
class TestHostComponent {}

describe('TabsContentComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let tabs: TabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    tabs = fixture.debugElement.query(By.directive(TabsComponent))
      .componentInstance as TabsComponent;
  });

  it('deve renderizar o conteúdo quando a aba estiver ativa', () => {
    const content = fixture.debugElement.query(By.css('.content-1'));
    const inactiveContent = fixture.debugElement.query(By.css('.content-2'));

    expect(content).not.toBeNull();
    expect(inactiveContent).toBeNull();
  });

  it('não deve renderizar o conteúdo quando a aba não estiver ativa', () => {
    tabs.selectTab('tab2');
    fixture.detectChanges();

    const content1 = fixture.debugElement.query(By.css('.content-1'));
    const content2 = fixture.debugElement.query(By.css('.content-2'));

    expect(content1).toBeNull();
    expect(content2).not.toBeNull();
  });
});