import { Column } from './column';

export interface Row {
  class?: string;
  columns: Column[];
}
