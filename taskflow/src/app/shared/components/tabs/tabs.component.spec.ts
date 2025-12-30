import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar activeTab com defaultValue no ngOnInit', () => {
    component.defaultValue = 'tab-1';

    fixture.detectChanges();

    expect(component.activeTab).toBe('tab-1');
  });

  it('deve inicializar activeTab vazio quando defaultValue não for informado', () => {
    fixture.detectChanges();

    expect(component.activeTab).toBe('');
  });

  it('deve alterar activeTab ao chamar selectTab', () => {
    fixture.detectChanges();

    component.selectTab('tab-2');

    expect(component.activeTab).toBe('tab-2');
  });

  it('deve sobrescrever o valor inicial ao selecionar outra aba', () => {
    component.defaultValue = 'tab-1';
    fixture.detectChanges();

    component.selectTab('tab-3');

    expect(component.activeTab).toBe('tab-3');
  });

  it('deve aceitar qualquer string como valor de aba', () => {
    fixture.detectChanges();

    component.selectTab('minha-aba');

    expect(component.activeTab).toBe('minha-aba');
  });
});