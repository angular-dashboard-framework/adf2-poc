import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  widgets: Map<String,any> = new Map<String,any>()

  register(name: string, widget: any){
    this.widgets.set(name, widget);
  }

  get(name: string): any {
    return this.widgets.get(name);
  }

}
