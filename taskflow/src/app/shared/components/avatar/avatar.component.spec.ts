import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { AvatarComponent } from "./avatar.component";

// Host Component criado só para o teste do ng-content
@Component({
    template: `<app-avatar>Avatar</app-avatar>`
})
class HostComponent {}

describe('AvatarComponent', () => {
    let component: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;
    let fixtureHostComponent: ComponentFixture<HostComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [AvatarComponent],
            declarations: [HostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarComponent);
        fixtureHostComponent = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar a classe corretamente', () => {
        component.className = 'rounded';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar') as HTMLElement;
        expect(avatarElement.classList).toContain('rounded');
    })

    it('deve sempre conter a classe ".avatar"', () => {
        component.className = '';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar') as HTMLElement;
        expect(avatarElement.classList).toContain('avatar');
    })

    it('deve renderizar o conteúdo do avatar', () => {
        const avatarElement = fixtureHostComponent.nativeElement.querySelector('.avatar') as HTMLElement;
        expect(avatarElement.textContent).toContain('Avatar');
    })

})