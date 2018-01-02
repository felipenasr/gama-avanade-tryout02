import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  

  renderScheduler: any = {
    daysOfTheWeekData: ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"],
    dayOfTheWeek: 0,
    selectDate: {
      day: 0,
      month:0,
      year: 0
    }
  }


  renderCalendar: any = {
    thisDay: 1,
    daysInMonth: 31,
    currentYear: 2017,
    currentMonth: 11,
    weekDay: 0,
    monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }
  
  daysMatrix: Array<Array<any>> = [];
  hasData = false;
  
  constructor() { }
  
  
  scheduler(row ,column){
    this.renderScheduler.dayOfTheWeek = column;
    this.renderScheduler.selectDate.day = this.daysMatrix[row][column];
    console.log(this.renderScheduler.dayOfTheWeek);
  }
  


  getMonth(yyyy: number, mm: number){
    var day = new Date(yyyy, mm, 1);
    this.renderCalendar.weekDay = moment(day).day();
    this.renderCalendar.daysInMonth = moment(day).daysInMonth();
  }
  ngOnInit() {
    this.getMonth(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.defineDaysMatrix();
  }


  defineDaysMatrix(){
    let count = 1;
    for(let i=0; i<6; i++){
      this.daysMatrix[i]=[];
      for(let j=0; j<7; j++){
        if(j < this.renderCalendar.weekDay && i == 0 ){
          console.log('teste')
          this.daysMatrix[i][j]=0;
        }else{
          this.daysMatrix[i][j]= "" +count;
          if(this.daysMatrix[i][j].length == 1){
            this.daysMatrix[i][j] = "0" + this.daysMatrix[i][j]
          }
          count++;
        }
        
        if(count > this.renderCalendar.daysInMonth){
          count = 0;
          count++;
        }

        
      }
    }
    this.hasData = true;

  }


  defineLastMonthDays(){
    var day = new Date(yyyy, mm, 1);    

  }


  



}
