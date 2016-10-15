import { Component, Input } from '@angular/core';
import { Row } from './row';

@Component({
  selector: 'adf-row',
  templateUrl: 'row.component.html'
})
export class RowComponent {

  @Input()
  row: Row;
}
