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
    model: Model;

    error: string;
    structure: Structure;

    constructor(
      private dndService: DndService,
      private structureService: StructureService
    ) {
      dndService.subscribe(event => this.handleDndEvent(event));
    }

    ngOnInit() {
      if (!this.model.title) {
        this.model.title = 'Dashboard';
      }

      let structureId = this.model.structure;
      if (structureId) {
        this.structure = this.structureService.get(structureId);
        if (!this.structure) {
          this.error = 'could not find structure with id ' + structureId;
        }
      } else {
        this.error = 'model does not define structure';
      }
    }

    private handleDndEvent(event: DndEvent) {
      this.dndService.synchronizeModel(this.model, event);
    }

}
