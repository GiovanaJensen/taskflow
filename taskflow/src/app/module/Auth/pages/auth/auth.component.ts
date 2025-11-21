import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports: [
        CommonModule,
        CardComponent,
        CardHeaderComponent,
        CardTitleComponent,
        CardContentComponent,
        CardDescriptionComponent,
        CardFooterComponent,
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

export class AuthComponent {}