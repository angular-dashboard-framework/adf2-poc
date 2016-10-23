import { Component, OnInit } from '@angular/core';

import { WidgetService } from './dashboard/widget.service';
import { StructureService } from './dashboard/structure.service';
import { NewsWidgetComponent, NewsEditWidgetComponent } from './widgets/news';

import { Model } from './dashboard';
import { AppService } from './app.service';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'adf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  model: Model;
  error: string;

  constructor(
    private appService: AppService,
    private widgetService: WidgetService,
    private structureService: StructureService
  ) {}

  ngOnInit() {
    // register widgets
    this.widgetService.register('news', {
      component: NewsWidgetComponent,
      editComponent: NewsEditWidgetComponent
    });

    // register structures
    this.structureService.register('4-8', {
      'rows': [{
        'columns': [{
          'id': '4',
          'class': 'col-md-4'
        }, {
          'id': '8',
          'class': 'col-md-8'
        }]
      }]
    });

    // fetch model
    this.appService.getModel().subscribe(
      model => this.model = model,
      error => this.error = error
    );
  }
}
