import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Model } from './model';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'adf-dashboard',
    styleUrls: ['dashboard.component.css'],
    templateUrl: 'dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

    @Input()
    title: string;

    @Input()
    model: Model;

    constructor(private dragulaService: DragulaService) {
      dragulaService.setOptions('adf-bag', {
        moves: function (el, container, handle) {
          return handle.className === 'adf-handle';
        }
      });
    }

}
