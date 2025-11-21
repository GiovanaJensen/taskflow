import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    standalone: true
})

export class TabsComponent {
    @Input() defaultValue = '';
    activeTab = '';

    ngOnInit(){
        this.activeTab = this.defaultValue;
    }

    selectTab(value: string) {
        this.activeTab = value;
    }
}