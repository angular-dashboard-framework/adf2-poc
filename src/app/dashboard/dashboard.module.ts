import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
  imports: [CommonModule],
  providers: [DashboardService]
})
export class DashboardModule {}
