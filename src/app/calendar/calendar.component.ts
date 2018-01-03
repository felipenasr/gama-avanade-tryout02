import { Component, OnInit } from '@angular/core';
import { CalendarService } from "./calendar.service"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  

  
  isThisMonth: Array<Array<any>> = [];

  renderScheduler: any = {
    daysOfTheWeekData: ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"],
    dayOfTheWeek: 1,
    selectDate: {
      day: 18,
      month:0,
      year: 0
    }
  }


  renderCalendar: any = {
    thisDay: 1,
    daysInMonth: 31,
    currentYear: 2017,
    currentYearString: "",
    currentMonth: 11,
    weekDay: 7,
    monthsOfYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }
  
  daysMatrix: Array<Array<any>> = [];
  hasData = false;
  
  constructor(
    private calanderData: CalendarService
  ) { }
  
  
  scheduler(row ,column, component: HTMLElement){
    console.log(component.textContent.trim());
    this.renderScheduler.dayOfTheWeek = column;
    this.renderScheduler.selectDate.day = this.daysMatrix[row][column];
    this.clearCalender();

    component.className += " select-day-calender";
  }
  

  clearCalender(){
    let spans: HTMLCollectionOf<Element> = document.getElementsByClassName("this-month");    
    for(let i = 0; i < spans.length; i++){
      spans[i].classList.remove("select-day-calender");
    }
  }


  
  
  defineDaysMatrix(){
    let count = 1;
    let contAux = 1;
    for(let i=0; i<6; i++){
      this.daysMatrix[i]=[];
      this.isThisMonth[i]=[];
      for(let j=0; j<7; j++){
        if(j < this.renderCalendar.weekDay && i == 0 ){
          this.daysMatrix[i][j]=0;
          this.isThisMonth[i][j] = false;
        }else{
          this.isThisMonth[i][j] = true;          
          this.daysMatrix[i][j]= "" +count;
          
          if(this.daysMatrix[i][j].length == 1){
            this.daysMatrix[i][j] = "0" + this.daysMatrix[i][j]
          }
          count++;
        }
        if(count > (this.renderCalendar.daysInMonth+1)){
          this.isThisMonth[i][j] = false;          
          this.daysMatrix[i][j]= "" +contAux;

          if(this.daysMatrix[i][j].length == 1){
            this.daysMatrix[i][j] = "0" + this.daysMatrix[i][j]
          }
          contAux++;
        }
        
        
      }
    }
    
    this.renderCalendar.currentYearString = ""+this.renderCalendar.currentYear;
    this.renderCalendar.currentYearString = this.renderCalendar.currentYearString.substring(2);
    
    this.prevDaysMonth();
    this.hasData = true;
    
  }
  
  prevDaysMonth(){
    let daysInMonth = this.calanderData.getDaysInMonth(this.renderCalendar.currentYear, (this.renderCalendar.currentMonth-1));    
    for(let i=5; i >= 0; i--){
      for(let j=6; j>=0; j--){
        if(this.daysMatrix[i][j] == 0){
          this.daysMatrix[i][j]=daysInMonth;
          daysInMonth--;
        }
      }
    }
  }
  
  
  
  
  prevMonth(){
    this.clearCalender();
    if(this.renderCalendar.currentMonth==0){
      this.renderCalendar.currentMonth = 11;
      this.renderCalendar.currentYear--;
    }else{
      this.renderCalendar.currentMonth--;      
    }
    
    this.renderCalendar.weekDay = this.calanderData.getWeekDay(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.renderCalendar.daysInMonth = this.calanderData.getDaysInMonth(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.defineDaysMatrix();
  }
  nextMonth(){
    this.clearCalender();    
    if(this.renderCalendar.currentMonth==11){
      this.renderCalendar.currentMonth = 0;
      this.renderCalendar.currentYear++;
    }else{
      this.renderCalendar.currentMonth++;      
    }
    
    this.renderCalendar.weekDay = this.calanderData.getWeekDay(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.renderCalendar.daysInMonth = this.calanderData.getDaysInMonth(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.defineDaysMatrix();
  }
  

  
  ngOnInit() {
    this.renderCalendar.weekDay = this.calanderData.getWeekDay(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.renderCalendar.daysInMonth = this.calanderData.getDaysInMonth(this.renderCalendar.currentYear, this.renderCalendar.currentMonth);
    this.defineDaysMatrix();

    this.calanderData.getApi().then(res=>{
      console.log(res.json());
    });;

    setTimeout(()=>{
      let defualt = document.getElementById("day18");
      defualt.className += " select-day-calender";
    }, 500)
  }
  
  
  
}
