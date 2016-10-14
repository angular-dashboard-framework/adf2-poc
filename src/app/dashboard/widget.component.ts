import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  ReflectiveInjector,
  ViewChild
} from '@angular/core';
import { Widget } from './widget';
import { WidgetContext } from './widget.context';
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

  constructor(
    private dashboardService: DashboardService,
    private componentFactoryResolver : ComponentFactoryResolver
  ){}

  ngOnInit() {
    let component = this.dashboardService.get(this.widget.type);
    let factory = this.componentFactoryResolver.resolveComponentFactory(component);

    let widgetContextProvider = {
      provide: WidgetContext,
      useValue: new WidgetContext(this.widget)
    };

    let resolvedProviders = ReflectiveInjector.resolve([widgetContextProvider]);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.content.injector);

    let componentRef = factory.create(injector);
    this.content.insert(componentRef.hostView);
  }
}
