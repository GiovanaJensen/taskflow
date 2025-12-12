import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CardComponent } from "../../../../shared/components/card/card/card.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { LabelComponent } from "../../../../shared/components/label/label.component";
import { TabsComponent } from "../../../../shared/components/tabs/tabs.component";
import { CardHeaderComponent } from "../../../../shared/components/card/card-header/card-header.component";
import { CardTitleComponent } from "../../../../shared/components/card/card-title/card-title.component";
import { CardContentComponent } from "../../../../shared/components/card/card-content/card-content.component";
import { CardDescriptionComponent } from "../../../../shared/components/card/card-description/card-description.component";
import { CardFooterComponent } from "../../../../shared/components/card/card-footer/card-footer.component";
import { TabsContentComponent } from "../../../../shared/components/tabs/tabs-content/tabs-content.component";
import { TabsListComponent } from "../../../../shared/components/tabs/tabs-list/tabs-list.component";
import { TabsTriggerComponent } from "../../../../shared/components/tabs/tabs-trigger/tabs-trigger.component";
import { Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../shared/services/auth.service";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardContentComponent,
        CardDescriptionComponent,
        CardHeaderComponent,
        ButtonComponent,
        InputComponent,
        LabelComponent,
        TabsComponent,
        TabsContentComponent,
        TabsListComponent,
        TabsTriggerComponent
    ]
})

export class AuthComponent implements OnInit {
    isLoading = false;

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    signupForm = this.fb.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {}

    async ngOnInit() {
    }

    async login() {
        if (this.loginForm.invalid) return;

        this.isLoading = true;

        const { email, password } = this.loginForm.value;

        this.authService.login({
            email: email!,
            password: password!
          }).subscribe({
            next: (response: any) => {
              this.isLoading = false;
        
              if (response.token) {
                localStorage.setItem('token', response.token);
              }
        
              alert('Login realizado com sucesso!');
              this.router.navigate(['']);
            },
            error: (error) => {
              this.isLoading = false;
              alert(error.error?.message || 'Credenciais inválidas');
            }
          });
    }

    async signup() {
        if (this.signupForm.invalid) return;
        
        this.isLoading = true;

        const { email, password, fullName } = this.signupForm.value;

        this.authService.register({
            fullName: fullName!,
            email: email!,
            password: password!
        }).subscribe({
            next: () => {
                this.isLoading = false;
                alert('Cadastro realizado com sucesso! Você já pode fazer login!');
                this.signupForm.reset();
            },
            error: (err) => {
                this.isLoading = false;
                alert('Erro ao criar usuário: ' + (err.error?.message || 'Erro desconhecido'));
            }
        })
    }


}