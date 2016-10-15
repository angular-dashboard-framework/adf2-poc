import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DashboardModule } from './dashboard/dashboard.module';
import { NewsModule } from './widgets/news/news.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    DashboardModule,
    NewsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {}
