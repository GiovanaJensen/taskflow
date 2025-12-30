import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent } from '../tabs.component';
import { TabsTriggerComponent } from './tabs-trigger.component';

@Component({
  template: `
    <app-tabs defaultValue="tab-1">
      <app-tabs-trigger value="tab-1">Aba 1</app-tabs-trigger>
      <app-tabs-trigger value="tab-2">Aba 2</app-tabs-trigger>
    </app-tabs>
  `,
  standalone: true,
  imports: [TabsComponent, TabsTriggerComponent],
})
class HostComponent {}

describe('TabsTriggerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('deve criar os triggers', () => {
    const triggers = fixture.debugElement.queryAll(
      By.directive(TabsTriggerComponent)
    );
    expect(triggers.length).toBe(2);
  });

  it('deve aplicar a classe active no trigger ativo', () => {
    const triggers = fixture.debugElement.queryAll(
      By.directive(TabsTriggerComponent)
    );

    const triggerAtivo = triggers[0].nativeElement;
    expect(triggerAtivo.classList.contains('active')).toBe(true);
  });

  it('deve aplicar a classe disabled no trigger inativo', () => {
    const triggers = fixture.debugElement.queryAll(
      By.directive(TabsTriggerComponent)
    );

    const triggerInativo = triggers[1].nativeElement;
    expect(triggerInativo.classList.contains('disabled')).toBe(true);
  });

  it('deve ativar a aba ao clicar no botão', () => {
    const triggers = fixture.debugElement.queryAll(
      By.directive(TabsTriggerComponent)
    );

    const segundoTrigger = triggers[1];

    const button = segundoTrigger.query(By.css('button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(segundoTrigger.nativeElement.classList.contains('active')).toBe(true);
  });
});