import { Column } from './column';
import { IdAware } from './idaware';

export interface Row extends IdAware {
  class?: string;
  columns: Column[];
}
