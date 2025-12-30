import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { AvatarFallbackComponent } from "./avatar-fallback.component";

// Host Component criado só para o teste do ng-content
@Component({
    template: `<app-avatar-fallback>Avatar</app-avatar-fallback>`
})
class HostComponent {}

describe('AvatarFallbackComponent', () => {
    let component: AvatarFallbackComponent;
    let fixture: ComponentFixture<AvatarFallbackComponent>;
    let fixtureHostComponent: ComponentFixture<HostComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [AvatarFallbackComponent],
            declarations: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarFallbackComponent);
        fixtureHostComponent = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar a classe corretamente', () => {
        component.className = 'image';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-fallback') as HTMLElement;
        expect(avatarElement.classList).toContain('image');
    })

    it('deve sempre conter a classe ".avatar-fallback"', () => {
        component.className = '';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-fallback') as HTMLElement;
        expect(avatarElement.classList).toContain('avatar-fallback');
    })

    it('deve renderizar o conteúdo do avatar-fallback', () => {
        const avatarElement = fixtureHostComponent.nativeElement.querySelector('.avatar-fallback') as HTMLElement;
        expect(avatarElement.textContent).toContain('Avatar');
    })

})