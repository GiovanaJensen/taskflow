import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component"
import { Component } from "@angular/core";

// Host Component criado só para o teste do ng-content
@Component({
    template: `<app-button>Salvar</app-button>`
})
class HostComponent {}

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let fixtureHostComponent: ComponentFixture<HostComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
            declarations: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        fixtureHostComponent = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar o type e o disabled corretamente', () => {
        component.type = 'submit';
        component.disabled = true;
        fixture.detectChanges();
        const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        expect(buttonElement.getAttribute('type')).toBe('submit');
        expect(buttonElement.disabled).toBe(true);
    })

    it('deve aplicar classes corretas para variant e size', () => {
        component.variant = 'destructive';
        component.size = 'full';
        fixture.detectChanges();
        const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        expect(buttonElement.classList).toContain('destructive');
        // expect(buttonElement.classList.contains('destructive')).toBe(true); // mesma coisa
        expect(buttonElement.classList).toContain('full');
    })

    it('deve renderizar o conteúdo do botão', () => {
        const buttonElement = fixtureHostComponent.nativeElement.querySelector('button') as HTMLButtonElement;
        expect(buttonElement.textContent).toContain('Salvar');
    })

})