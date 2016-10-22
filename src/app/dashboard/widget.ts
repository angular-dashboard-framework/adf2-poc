import { IdAware } from './idaware';

export interface Widget extends IdAware {
  title: string;
  type: string;
  position: Position;
  config: any;
}

export interface Position {
  column: string;
  order: number;
}
