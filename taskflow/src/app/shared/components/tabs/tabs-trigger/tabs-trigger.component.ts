import { Component, HostBinding, Input, Optional } from "@angular/core";
import { TabsComponent } from "../tabs.component";

@Component({
    selector: 'app-tabs-trigger',
    templateUrl: './tabs-trigger.component.html',
    styleUrls: ['./tabs-trigger.component.scss'],
    standalone: true
})

export class TabsTriggerComponent {
    @Input() value!: string;

    constructor(@Optional() private tabs: TabsComponent){}

    get active(){
        return this.tabs?.activeTab === this.value;
    }

    activate() {
        this.tabs?.selectTab(this.value);
    }

    @HostBinding('class.active')
    get isActiveClass() {
        return this.active;
    }

    @HostBinding('class.disabled')
    get inactiveClass() {
        return !this.active;
    }

}