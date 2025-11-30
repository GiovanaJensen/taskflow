import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { LabelComponent } from "./label.component";

// Host Component criado só para o teste do ng-content
@Component({
    template: `<app-label>Nome completo:</app-label>`
})
class HostComponent {}

describe('LabelComponent', () => {
    let component: LabelComponent;
    let fixture: ComponentFixture<LabelComponent>;
    let fixtureHostComponent: ComponentFixture<HostComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [LabelComponent],
            declarations: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LabelComponent);
        fixtureHostComponent = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar o atributo for corretamente', () => {
        component.for = 'name';
        fixture.detectChanges();
        const labelElement = fixture.nativeElement.querySelector('.app-label') as HTMLElement;
        expect(labelElement.getAttribute('for')).toContain('name');
    })

    it('deve aplicar a classe "disabled"', () => {
        component.disabled = true;
        fixture.detectChanges();
        const labelElement = fixture.nativeElement.querySelector('.app-label') as HTMLElement;
        expect(labelElement.classList).toContain('disabled');
    })

    it('deve renderizar o conteúdo da label', () => {
        const labelElement = fixtureHostComponent.nativeElement.querySelector('.app-label') as HTMLElement;
        expect(labelElement.textContent).toContain('Nome completo:');
    })

})