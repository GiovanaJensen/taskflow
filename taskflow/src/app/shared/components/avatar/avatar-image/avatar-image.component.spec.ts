import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AvatarImageComponent } from "./avatar-image.component";

describe('AvatarImageComponent', () => {
    let component: AvatarImageComponent;
    let fixture: ComponentFixture<AvatarImageComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            imports: [AvatarImageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    })

    it('deve aplicar a classe corretamente', () => {
        component.className = 'large';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-image') as HTMLElement;
        expect(avatarElement.classList).toContain('large');
    })

    it('deve renderizar a imagem enviada do src', () => {
        component.src = 'taskflow\src\favicon.ico';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-image') as HTMLElement;
        expect(avatarElement.getAttribute('src')).toBe('taskflow\src\favicon.ico');
    })

    it('deve renderizar o texto enviado no alt', () => {
        component.alt = 'Imagem de favicon';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-image') as HTMLElement;
        expect(avatarElement.getAttribute('alt')).toBe('Imagem de favicon');
    })

    it('não deve quebrar ao enviar um src vazio', () => {
        component.src = '';
        fixture.detectChanges();
        const avatarElement = fixture.nativeElement.querySelector('.avatar-image') as HTMLElement;
        expect(avatarElement.getAttribute('src')).toBe('');
    })

    it('deve emitir onError se a imagem falhar', () => {
        const spy = jest.spyOn(component.onError, 'emit');
        const avatarElement = fixture.nativeElement.querySelector('.avatar-image') as HTMLElement;
        avatarElement.dispatchEvent(new Event('error'));
        expect(spy).toHaveBeenCalled();
    })

})