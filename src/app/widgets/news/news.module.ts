import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { NewsEditWidgetComponent } from './news-edit-widget.component';
import { NewsWidgetComponent } from './news-widget.component';
import { NewsService } from './news.service';

@NgModule({
  declarations: [NewsWidgetComponent, NewsEditWidgetComponent],
  exports: [NewsWidgetComponent, NewsEditWidgetComponent],
  imports: [CommonModule, JsonpModule],
  providers: [NewsService],
  entryComponents: [NewsWidgetComponent, NewsEditWidgetComponent]
})
export class NewsModule {}
