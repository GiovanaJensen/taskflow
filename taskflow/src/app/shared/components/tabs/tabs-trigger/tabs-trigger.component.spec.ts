import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsTriggerComponent } from './tabs-trigger.component';
import { TabsComponent } from '../tabs.component';

@Component({
  template: `
    <app-tabs-trigger value="tab1">
      Aba 1
    </app-tabs-trigger>
  `,
  standalone: true,
  imports: [TabsTriggerComponent],
})
class TestHostComponent {}

describe('TabsTriggerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let tabsMock: TabsComponent;

  beforeEach(async () => {
    tabsMock = {
      activeTab: 'tab1',
      selectTab: jest.fn(),
    } as unknown as TabsComponent;

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: TabsComponent, useValue: tabsMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('deve chamar tabs.selectTab com o valor ao clicar', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(tabsMock.selectTab).toHaveBeenCalledWith('tab1');
  });

  it('deve aplicar a classe "active" quando a aba estiver ativa', () => {
    const trigger = fixture.debugElement.query(By.css('app-tabs-trigger'));

    expect(trigger.nativeElement.classList).toContain('active');
    expect(trigger.nativeElement.classList).not.toContain('disabled');
  });

  it('deve aplicar a classe "disabled" quando a aba não estiver ativa', () => {
    tabsMock.activeTab = 'tab2';
    fixture.detectChanges();

    const trigger = fixture.debugElement.query(By.css('app-tabs-trigger'));

    expect(trigger.nativeElement.classList).toContain('disabled');
    expect(trigger.nativeElement.classList).not.toContain('active');
  });
});