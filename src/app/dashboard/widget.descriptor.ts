import { Type } from '@angular/core';

export interface WidgetDescriptor {
  component: Type<any>;
  editComponent?: Type<any>;
}
