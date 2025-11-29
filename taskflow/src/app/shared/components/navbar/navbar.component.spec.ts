import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [NavbarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve renderizar o título TaskFlow', () => {
        fixture.detectChanges();
        const navbarElement = fixture.nativeElement;
        expect(navbarElement.textContent).toContain('TaskFlow');
    })

    it('deve exibir a imagem do usuário quando showFallback = false', () => {
        component.showFallback = false;
        fixture.detectChanges();
        const avatarImage = fixture.nativeElement.querySelector('app-avatar-image');
        expect(avatarImage).toBeTruthy();
    });

    it('deve exibir o fallback quando showFallback = true', () => {
        component.showFallback = true;
        component.userInitials = "GF";
        fixture.detectChanges();
        const avatarFallback = fixture.nativeElement.querySelector('app-avatar-fallback');
        expect(avatarFallback.textContent).toContain('GF');
    });

})