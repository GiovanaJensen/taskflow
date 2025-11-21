import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-content',
    templateUrl: './card-content.component.html',
    styleUrls: ['./card-content.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CardContentComponent {
    @Input() className: string = ''
}