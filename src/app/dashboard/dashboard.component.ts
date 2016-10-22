import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Model } from './model';
import { Structure } from './structure';

import { DndService, DndEvent } from './dnd.service';
import { StructureService } from './structure.service';


@Component({
    selector: 'adf-dashboard',
    styleUrls: ['dashboard.component.css'],
    templateUrl: 'dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

    @Input()
    title: string;

    @Input()
    model: Model;

    @Input()
    structureId: string;

    structure: Structure;

    constructor(
      private dndService: DndService,
      private structureService: StructureService
    ) {
      dndService.subscribe(event => this.handleDndEvent(event));
    }

    ngOnInit() {
      this.structure = this.structureService.get(this.structureId);
      // todo handle structure not found error
    }

    private handleDndEvent(event: DndEvent) {
      this.dndService.synchronizeModel(this.model, event);
    }

}
