import { Component, OnInit } from '@angular/core';

import { StructureService } from './dashboard/structure.service';

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
    private structureService: StructureService
  ) { }

  ngOnInit() {
    // register structures
    this.structureService.register('4-8', {
      'rows': [{
        'columns': [{
          'id': '4',
          'class': 'col-md-4'
        }, {
          'id': '8',
          'class': 'col-md-8',
          'rows': [{
            'columns': [{
              'id': '8/1/1',
              'class': 'col-md-6',
            }, {
              'id': '8/1/2',
              'class': 'col-md-6',
            }]
          }, {
            'columns': [{
              'id': '8/2/1',
              'class': 'col-md-6',
            }, {
              'id': '8/2/2',
              'class': 'col-md-6',
            }]
          }]
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
