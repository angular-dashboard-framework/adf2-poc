import { Row } from './row';
import { IdAware } from './idaware';

export interface Structure extends IdAware {
  rows: Row[];
}
