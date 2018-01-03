import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from "angular-in-memory-web-api";


import { AppComponent } from './app.component';
import { AppointmentsSeed }  from './appointments.seed';
import { CalendarModule } from './calendar/calendar.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppointmentsSeed)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
