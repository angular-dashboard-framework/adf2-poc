import { Widget } from './widget';

export interface Model {
  // title of the dashboard
  title: string;
  // id of dashboard structure
  structure: string;
  // widgets
  widgets: Widget[];
}
