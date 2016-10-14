import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { DashboardService } from './dashboard/dashboard.service';
import { WidgetComponent } from './dashboard/widget.component';
import { ColumnComponent } from './dashboard/column.component';
import { RowComponent } from './dashboard/row.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NewsService } from './widgets/news.service';
import { NewsWidgetComponent } from './widgets/news-widget.component';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    NewsWidgetComponent,
    WidgetComponent,
    ColumnComponent,
    RowComponent,
    DashboardComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  entryComponents: [NewsWidgetComponent],
  providers: [AppService, DashboardService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
