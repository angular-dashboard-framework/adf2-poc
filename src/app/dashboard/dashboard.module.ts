import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { StructureService } from './structure.service';
import { WidgetService } from './widget.service';
import { DndService } from './dnd.service';

import { WidgetComponent } from './widget.component';
import { ColumnComponent } from './column.component';
import { RowComponent } from './row.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    WidgetComponent,
    ColumnComponent,
    RowComponent,
    DashboardComponent
  ],
  exports: [DashboardComponent],
  imports: [CommonModule, DragulaModule],
  providers: [StructureService, WidgetService, DndService]
})
export class DashboardModule {}
