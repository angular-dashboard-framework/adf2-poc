import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { DashboardService } from './dashboard.service';
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
  providers: [DashboardService]
})
export class DashboardModule {}
