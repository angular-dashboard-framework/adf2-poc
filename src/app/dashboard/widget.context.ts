import { Injectable } from '@angular/core';

import {Widget} from './widget';

@Injectable()
export class WidgetContext {

  constructor(private widget: Widget){}

  getWidet(): Widget {
    return this.widget;
  }

}
