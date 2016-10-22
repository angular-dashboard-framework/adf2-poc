import { Row } from './row';
import { IdAware } from './idaware';

export interface Column extends IdAware {
  class?: string;
  rows?: Row[];
}
