import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    CalendarComponent    
  ],
  providers: [
    CalendarService
  ],
})
export class CalendarModule { }
