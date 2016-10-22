import { Component, Input } from '@angular/core';
import { Row } from './row';
import { Model } from './model';

@Component({
  selector: 'adf-row',
  templateUrl: 'row.component.html'
})
export class RowComponent {

  @Input()
  row: Row;

  @Input()
  model: Model;
}
