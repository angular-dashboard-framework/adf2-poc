import { Injectable } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Model } from './model';
import { Widget } from './widget';

declare type DndCallback = (event: DndEvent) => void;

export interface DndEvent {
  sourceWidget: string;
  targetColumn: string;
  targetWidget?: string;
}

@Injectable()
export class DndService {

  constructor(
    private dragulaService: DragulaService
  ) {
    dragulaService.setOptions('adf-bag', {
      moves: function (el, container, handle) {
        return handle.className.indexOf('adf-handle') >= 0;
      }
    });
  }

  subscribe(fn: DndCallback) {
    this.dragulaService.drop.subscribe(event => {
      fn({
        sourceWidget: this.elementId(event, 1),
        targetColumn: this.elementId(event, 2),
        targetWidget: this.elementId(event, 4)
      });
    });
  }

  synchronizeModel(model: Model, event: DndEvent) {
    let sourceWidget = this.findWidget(model, event.sourceWidget);
    if (sourceWidget.position.column !== event.targetColumn) {
      sourceWidget.position.column = event.targetColumn;
    }
    this.reorderColumn(model, sourceWidget, event);
  }


  private reorderColumn(model: Model, sourceWidget: Widget, event: DndEvent) {
    let widgets = this.findWidgets(model, event.targetColumn);
    sourceWidget.position.order = this.getTemporaryPosition(widgets, event.targetWidget);
    widgets = widgets.sort((left: Widget, right: Widget) => {
      return left.position.order - right.position.order;
    });
    for (let i = 0; i < widgets.length; i++) {
      widgets[i].position.order = i;
    }
  }

  private findWidgets(model: Model, cid: string): Widget[] {
    let widgets: Widget[] = [];

    for (let widget of model.widgets) {
      if (widget.position.column === cid) {
        widgets.push(widget);
      }
    }

    return widgets;
  }

  private getTemporaryPosition(widgets: Widget[], wid: string): number {
    if (!wid) {
      return -0.5;
    }

    for (let widget of widgets) {
      if (widget.id === wid) {
        return widget.position.order - 0.5;
      }
    }

    return 999999;
  }

  private findWidget(model: Model, id: string): Widget {
    for (let widget of model.widgets) {
      if (widget.id === id) {
        return widget;
      }
    }
    return null;
  }


  private elementId(event, index): string {
    let id = null;
    if (event.length >= index && event[index]) {
      id = event[index].getAttribute('adf-id');
    }
    return id;
  }
}
