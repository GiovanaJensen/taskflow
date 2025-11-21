import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-header',
    templateUrl: './card-header.component.html',
    styleUrls: ['./card-header.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CardHeaderComponent {
    @Input() className: string = '';
}