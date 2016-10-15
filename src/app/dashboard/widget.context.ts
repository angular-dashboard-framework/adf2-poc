import { Injectable, EventEmitter } from '@angular/core';

import { Widget } from './widget';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WidgetContext {

  private eventObserver: Observer<Object>;
  widgetEvents: Observable<Object>;

  constructor(
    private widget: Widget,
  ){
    this.widgetEvents = Observable.create(observer => this.eventObserver = observer);
  }

  getWidet(): Widget {
    return this.widget;
  }

  getConfig(): any {
    let config = this.widget.config || {};
    return Object.assign({}, config);
  }

  configChanged(config: Object) {
    this.eventObserver.next(config);
  }

  destroy(){
    this.eventObserver.complete();
  }

}
