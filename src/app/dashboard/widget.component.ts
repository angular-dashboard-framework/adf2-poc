import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ReflectiveInjector,
  ViewChild,
  ApplicationRef,
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
export class WidgetComponent implements OnInit {

  @Input()
  widget: Widget;

  @ViewChild('content', {read: ViewContainerRef})
  content: ViewContainerRef;

  editMode = false;

  descriptor: WidgetDescriptor;

  error: string;

  constructor(
    private dashboardService: DashboardService,
    private resolver : ComponentFactoryResolver
  ){}

  ngOnInit() {
    this.descriptor = this.dashboardService.get(this.widget.type);
    if (this.descriptor){
      this.renderComponent(this.descriptor.component);
    } else {
      this.error = "could not find widget " + this.widget.type;
    }
  }

  renderComponent(component: Type<any>){
    let factory = this.resolver.resolveComponentFactory(component);

    let widgetContextProvider = {
      provide: WidgetContext,
      useValue: new WidgetContext(this.widget)
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
