import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-description',
    templateUrl: './card-description.component.html',
    styleUrls: ['./card-description.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CardDescriptionComponent {
    @Input() className: string = '';
}