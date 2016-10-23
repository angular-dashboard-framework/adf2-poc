import { Component, Input, OnInit } from '@angular/core';
import { Column } from './column';
import { Widget } from './widget';
import { Model } from './model';

@Component({
  selector: 'adf-column',
  templateUrl: 'column.component.html'
})
export class ColumnComponent implements OnInit {

  @Input()
  column: Column;

  @Input()
  model: Model;

  widgets: Widget[] = [];

  constructor() {}

  ngOnInit() {
    let columnWidgets: Widget[] = [];

    // find widget of column
    for (let widget of this.model.widgets) {
      if (widget.position.column === this.column.id ) {
        columnWidgets.push(widget);
      }
    }

    // column widgets
    this.widgets = columnWidgets.sort((left: Widget, right: Widget) => {
        return left.position.order - right.position.order;
    });
  }

  remove(widget: Widget) {
    if (this.removeWidgetFromView(widget)) {
      this.removeWidgetFromModel(widget);
    }
  }

  private removeWidgetFromModel(widget: Widget): boolean {
    return this.removeItemFromArray(this.model.widgets, widget);
  }

  private removeWidgetFromView(widget: Widget): boolean {
    return this.removeItemFromArray(this.widgets, widget);
  }

  private removeItemFromArray(array: Object[], item: Object): boolean {
    let index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
      return true;
    }
    return false;
  }
}
