import { Component, Input } from '@angular/core';
import { Model } from './model';

@Component({
    selector: 'adf-dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

    @Input()
    title: string;

    @Input()
    model: Model;

}
