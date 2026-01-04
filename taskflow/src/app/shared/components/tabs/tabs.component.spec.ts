import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-tabs defaultValue="tab1">
      <div class="tab-content">Conteúdo</div>
    </app-tabs>
  `,
  standalone: true,
  imports: [TabsComponent],
})
class TestHostComponent {}

describe('TabsComponent', () => {
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

  it('deve criar o componente', () => {
    expect(tabs).toBeTruthy();
  });

  it('deve inicializar activeTab com defaultValue no ngOnInit', () => {
    expect(tabs.activeTab).toBe('tab1');
  });

  it('deve alterar a aba ativa ao chamar selectTab()', () => {
    tabs.selectTab('tab2');

    expect(tabs.activeTab).toBe('tab2');
  });

  it('deve renderizar o conteúdo projetado (ng-content)', () => {
    const content = fixture.debugElement.query(By.css('.tab-content'));

    expect(content).not.toBeNull();
    expect(content.nativeElement.textContent).toContain('Conteúdo');
  });
});