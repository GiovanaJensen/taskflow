import { Component, HostBinding, Input, Optional } from "@angular/core";
import { TabsComponent } from "../tabs.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-tabs-content',
    templateUrl: './tabs-content.component.html',
    styleUrls: ['./tabs-content.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class TabsContentComponent {
    @Input() value!: string;

    constructor(@Optional() private tabs: TabsComponent){}

    get active() {
        return this.tabs.activeTab === this.value;
    }
}