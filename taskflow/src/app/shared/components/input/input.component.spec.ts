import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { InputComponent } from "./input.component";

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [InputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar o atributo type corretamente', () => {
        component.type = 'email';
        fixture.detectChanges();
        const inputElement = fixture.nativeElement.querySelector('.app-input') as HTMLInputElement;
        expect(inputElement.type).toBe('email');
    })

    it('deve aplicar o atributo placeholder corretamente', () => {
        component.placeholder = 'email@email.com';
        fixture.detectChanges();
        const inputElement = fixture.nativeElement.querySelector('.app-input') as HTMLInputElement;
        expect(inputElement.placeholder).toBe('email@email.com');
    })

    it('deve aplicar o atributo disabled corretamente', () => {
        component.disabled = true;
        fixture.detectChanges();
        const inputElement = fixture.nativeElement.querySelector('.app-input') as HTMLInputElement;
        expect(inputElement.disabled).toBeTruthy();
    })

    it('deve aplicar o atributo value corretamente', () => {
        component.value = 'email@email.com';
        fixture.detectChanges();
        const inputElement = fixture.nativeElement.querySelector('.app-input') as HTMLInputElement;
        expect(inputElement.value).toBe('email@email.com');
    })

    it('deve aplicar o atributo name e id corretamente', () => {
        component.name = 'input-email';
        component.id = 'input-id';
        fixture.detectChanges();
        const inputElement = fixture.nativeElement.querySelector('.app-input') as HTMLInputElement;
        expect(inputElement.name).toBe('input-email');
        expect(inputElement.id).toBe('input-id');
    })

    it('deve atualizar o valor ao digitar no input', () => {
        const input = fixture.nativeElement.querySelector('input');
        input.value = 'Novo valor de nome';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.value).toBe('Novo valor de nome');
    })

    it('deve chamar o onChange ao digitar', () => {
        const spy = jest.fn();
        component.registerOnChange(spy);
        const input = fixture.nativeElement.querySelector('input');
        input.value = 'meu nome';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith('meu nome');
    })

    it('deve chamar o onTouched ao digitar', () => {
        const spy = jest.fn();
        component.registerOnTouched(spy);
        const input = fixture.nativeElement.querySelector('input');
        input.value = 'meu nome';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        input.value = 'meu nome 2';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(2);
    })

    it('deve atualizar o DOM quando o writeValue() é chamado', () => {
        component.writeValue('valor do input');
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input');
        expect(input.value).toBe('valor do input');
    })

    it('deve desabilitar o input quando setDisabledState(true) for chamado', () => {
        component.setDisabledState(true);
        fixture.detectChanges();
        const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
        expect(input.disabled).toBeTruthy();
    })

})