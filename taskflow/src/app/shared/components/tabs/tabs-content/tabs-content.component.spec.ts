import { Component } from '@angular/core';
import { TabsComponent } from '../tabs.component';
import { TabsContentComponent } from './tabs-content.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-tabs [defaultValue]="activeTab">
      <app-tabs-content value="tab-1">
        <p class="content-1">Conteúdo Aba 1</p>
      </app-tabs-content>

      <app-tabs-content value="tab-2">
        <p class="content-2">Conteúdo Aba 2</p>
      </app-tabs-content>
    </app-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabsContentComponent]
})
class HostComponent {
  activeTab = 'tab-1';
}

describe('TabsContentComponent', () => {
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

  it('deve renderizar o conteúdo quando a aba estiver ativa', () => {
    const content = fixture.debugElement.query(By.css('.content-1'));
    expect(content).not.toBeNull();
  });

  it('não deve renderizar o conteúdo quando a aba não estiver ativa', () => {
    const content = fixture.debugElement.query(By.css('.content-2'));
    expect(content).toBeNull();
  });

  it('deve alternar o conteúdo ao mudar a aba ativa', () => {
    const tabsDebug = fixture.debugElement.query(By.directive(TabsComponent));
    const tabs = tabsDebug.componentInstance as TabsComponent;

    tabs.selectTab('tab-2');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.content-1'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.content-2'))).not.toBeNull();
  });
});
