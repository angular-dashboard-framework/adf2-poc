import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  ComponentFactoryResolver,
  ViewContainerRef,
  ReflectiveInjector,
  ViewChild,
  EventEmitter,
  Type
} from '@angular/core';
import { Widget } from './widget';
import { WidgetContext } from './widget.context';
import { WidgetDescriptor } from './widget.descriptor';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'widget',
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
    private dashboardService: DashboardService,
    private resolver : ComponentFactoryResolver
  ){}

  ngOnInit() {
    this.context = new WidgetContext(this.widget);
    this.context.widgetEvents.subscribe(event => this.onWidgetEvent(event));

    this.descriptor = this.dashboardService.get(this.widget.type);
    if (this.descriptor){
      this.renderComponent(this.descriptor.component);
    } else {
      this.error = "could not find widget " + this.widget.type;
    }
  }

  ngOnDestroy() {
    this.context.destroy();
  }

  onWidgetEvent(config: Object) {
    this.widget.config = config;
    this.toggleEditMode();
  }

  renderComponent(component: Type<any>){
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

  toggleEditMode(){
    if (this.descriptor){
      this.editMode = !this.editMode;
      this.content.remove();
      if (this.editMode){
        this.renderComponent(this.descriptor.editComponent);
      } else {
        this.renderComponent(this.descriptor.component);
      }
    } else {
      this.error = "could not find widget " + this.widget.type;
    }
  }
}