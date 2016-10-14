import { Component, Input } from '@angular/core';
import { Column } from './column';

@Component({
  selector: 'column',
  templateUrl: 'column.component.html'
})
export class ColumnComponent {

  @Input()
  column: Column;
}
