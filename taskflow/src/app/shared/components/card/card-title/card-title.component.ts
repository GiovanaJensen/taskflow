import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-title',
    templateUrl: './card-title.component.html',
    styleUrls: ['./card-title.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CardTitleComponent {
    @Input() className: string = '';
}