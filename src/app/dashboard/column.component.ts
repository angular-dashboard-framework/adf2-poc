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
    console.log(this.model);

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
}
