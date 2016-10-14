import { Component, OnInit, Inject } from '@angular/core';

import { WidgetContext } from '../dashboard/widget.context';
import { Widget } from '../dashboard/widget';
import { NewsService } from './news.service';
import { NewsConfiguration } from './news.configuration';

@Component({
  templateUrl: 'news-widget.component.html',
  styleUrls: ['news-widget.component.css']
})
export class NewsWidgetComponent implements OnInit {

  feed: any;
  configuration: NewsConfiguration;

  constructor(
    private newsService: NewsService,
    private context: WidgetContext
  ){
    this.configuration = context.getWidet().config || {};
  }

  ngOnInit(){
    if (this.configuration.service){
      this.newsService.getFeed(this.configuration.service)
          .subscribe(feed => this.feed = feed);
    }
  }

}
