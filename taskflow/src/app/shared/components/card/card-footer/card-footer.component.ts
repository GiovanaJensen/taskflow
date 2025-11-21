import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-card-footer',
    templateUrl: './card-footer.component.html',
    styleUrls: ['./card-footer.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class CardFooterComponent {
    @Input() className: string = '';
}