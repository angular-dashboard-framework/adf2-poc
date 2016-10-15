import { Injectable, Injector } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { WidgetDescriptor } from './widget.descriptor';

@Injectable()
export class DashboardService {

  widgets: Map<String,WidgetDescriptor> = new Map<String,WidgetDescriptor>()

  register(name: string, descriptor: WidgetDescriptor){
    this.widgets.set(name, descriptor);
  }

  get(name: string): WidgetDescriptor {
    return this.widgets.get(name);
  }
}
