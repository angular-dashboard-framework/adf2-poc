import { Injectable } from '@angular/core';

import { Widget } from './widget';
import { WidgetConfigChanged, EditModeCanceled } from './widget.events';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WidgetContext {

  private eventObserver: Observer<Object>;
  widgetEvents: Observable<Object>;
  editMode = false;

  constructor(
    private widget: Widget
  ) {
    this.widgetEvents = Observable.create(observer => this.eventObserver = observer);
  }

  getWidet(): Widget {
    return this.widget;
  }

  getConfig(): any {
    let config = this.widget.config || {};
    return Object.assign({}, config);
  }

  cancelEditMode() {
    this.eventObserver.next(new EditModeCanceled());
  }

  configChanged(config: Object) {
    this.eventObserver.next(new WidgetConfigChanged(config));
  }

  destroy() {
    this.eventObserver.complete();
  }

}
