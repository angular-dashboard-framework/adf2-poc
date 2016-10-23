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

  dropBag: string;

  widgets: Widget[] = [];

  constructor() {}

  ngOnInit() {
    if ( ! this.isRowColumn() ) {
      this.widgets = this.findColumnWidgets();
      this.enableDropZone();
    }
  }

  remove(widget: Widget) {
    if (this.removeWidgetFromView(widget)) {
      this.removeWidgetFromModel(widget);
    }
  }

  private enableDropZone() {
    this.dropBag = 'adfBag';
  }

  private findColumnWidgets(): Widget[] {
    let columnWidgets: Widget[] = [];
    for (let widget of this.model.widgets) {
      if (widget.position.column === this.column.id ) {
        columnWidgets.push(widget);
      }
    }

    // column widgets
    return columnWidgets.sort((left: Widget, right: Widget) => {
        return left.position.order - right.position.order;
    });
  }

  private isRowColumn() {
    return this.column.rows && this.column.rows.length > 0;
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
