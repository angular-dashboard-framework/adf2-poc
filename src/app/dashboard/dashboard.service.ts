import { Injectable } from '@angular/core';
import { WidgetDescriptor } from './widget.descriptor';

@Injectable()
export class DashboardService {

  widgets: Map<String, WidgetDescriptor> = new Map<String, WidgetDescriptor>();

  register(name: string, descriptor: WidgetDescriptor) {
    this.widgets.set(name, descriptor);
  }

  get(name: string): WidgetDescriptor {
    return this.widgets.get(name);
  }
}
