import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ReflectiveInjector,
  ViewChild,
  Type
} from '@angular/core';
import { Widget } from './widget';
import { WidgetContext } from './widget.context';
import { WidgetDescriptor } from './widget.descriptor';
import { WidgetService } from './widget.service';
import { WidgetConfigChanged, EditModeCanceled } from './widget.events';

@Component({
  selector: 'adf-widget',
  styleUrls: ['widget.component.css'],
  templateUrl: 'widget.component.html'
})
export class WidgetComponent implements OnInit, OnDestroy {

  @Input()
  widget: Widget;

  @ViewChild('content', {read: ViewContainerRef})
  content: ViewContainerRef;

  context: WidgetContext;
  editMode = false;
  descriptor: WidgetDescriptor;
  error: string;

  constructor(
    private widgetService: WidgetService,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    if (!this.widget.id) {
      this.widget.id = this.widgetService.id();
    }
    this.context = new WidgetContext(this.widget);
    this.context.widgetEvents.subscribe(event => this.onWidgetEvent(event));

    this.descriptor = this.widgetService.get(this.widget.type);
    if (this.descriptor) {
      this.renderComponent(this.descriptor.component);
    } else {
      this.error = 'could not find widget ' + this.widget.type;
    }
  }

  ngOnDestroy() {
    this.context.destroy();
  }

  onWidgetEvent(event: Object) {
    if (event instanceof WidgetConfigChanged) {
      this.configChanged(<WidgetConfigChanged>event);
    } else if (event instanceof EditModeCanceled) {
      this.cancelEditMode();
    }
  }

  private cancelEditMode() {
    this.toggleEditMode();
  }

  private configChanged(event: WidgetConfigChanged) {
      this.widget.config = event.configuration;
      this.toggleEditMode();
  }

  private renderComponent(component: Type<any>) {
    let factory = this.resolver.resolveComponentFactory(component);

    let widgetContextProvider = {
      provide: WidgetContext,
      useValue: this.context
    };

    let resolvedProviders = ReflectiveInjector.resolve([widgetContextProvider]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.content.parentInjector);

    let componentRef = factory.create(injector);
    this.content.insert(componentRef.hostView);
  }

  toggleEditMode() {
    if (this.descriptor) {
      this.editMode = !this.editMode;
      this.content.remove();
      if (this.editMode) {
        this.renderComponent(this.descriptor.editComponent);
      } else {
        this.renderComponent(this.descriptor.component);
      }
    } else {
      this.error = 'could not find widget ' + this.widget.type;
    }
  }
}
