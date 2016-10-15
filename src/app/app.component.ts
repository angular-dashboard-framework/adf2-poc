import { Component, OnInit } from '@angular/core';

import { DashboardService } from './dashboard/dashboard.service';
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

  title = 'Dashboard Application';

  model: Model;
  error: string;

  constructor(
    private appService: AppService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    // register widgets
    this.dashboardService.register('news', {
      component: NewsWidgetComponent,
      editComponent: NewsEditWidgetComponent
    });

    // fetch model
    this.appService.getModel().subscribe(
      model => this.model = model,
      error => this.error = error
    );
  }
}
