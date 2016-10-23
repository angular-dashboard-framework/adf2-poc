import { WidgetContext } from './widget.context';

declare type WidgetExecute = (context: WidgetContext) => void;
declare type WidgetIsAvailable = (context: WidgetContext) => boolean;

/**
 * Provider for custom widget functions. A widget component can
 * implement the WidgetFunctionProvider and return custon widget
 * functions.
 */
export interface WidgetFunctionProvider {
  getFunctions(): WidgetFunction[];
}

export interface WidgetFunction {

  title: string;
  description: string;
  class: string;

  isAvailable(context: WidgetContext): boolean;
  execute(context: WidgetContext);
}

export class WidgetFunctions {

  public static refresh(executor: WidgetExecute, available?: WidgetIsAvailable): WidgetFunction {
    if (!available) {
      available = function(context: WidgetContext) {
        return !context.editMode;
      };
    }
    return {
      title: 'Refresh',
      description: 'Reload the Widget',
      class: 'glyphicon glyphicon-refresh',
      isAvailable: available,
      execute: executor
    };
  }

}

