import { Component, OnInit } from '@angular/core';

import { WidgetContext } from '../../dashboard/widget.context';
import { WidgetFunction, WidgetFunctionProvider, WidgetFunctions } from '../../dashboard/widget.functions';

import { NewsService } from './news.service';
import { NewsConfiguration } from './news.configuration';

@Component({
  templateUrl: 'news-widget.component.html',
  styleUrls: ['news-widget.component.css']
})
export class NewsWidgetComponent implements OnInit, WidgetFunctionProvider {

  feed: any;
  error: string;
  configuration: NewsConfiguration;

  constructor(
    private newsService: NewsService,
    private context: WidgetContext
  ) {
    this.configuration = context.getWidet().config || {};
  }

  ngOnInit() {
    this.fetchFeed();
  }

  getFunctions(): WidgetFunction[] {
    return [
      WidgetFunctions.refresh(this.fetchFeed, this.isRefreshAvailable)
    ];
  }

  private isRefreshAvailable(): boolean {
    return !this.context.editMode && this.configuration.service !== null && this.configuration.service !== undefined;
  }

  private fetchFeed() {
    if (this.configuration.service) {
      this.newsService.getFeed(this.configuration.service)
          .subscribe(
            feed => this.feed = feed,
            error => this.error = error
          );
    }
  }

}
