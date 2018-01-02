import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable()

export class CalendarService{

    constructor(){}

    public getWeekDay(yyyy: number, mm: number){
        var day = new Date(yyyy, mm, 1);
        return moment(day).day();
    }

    public getDaysInMonth(yyyy: number, mm: number){
        var day = new Date(yyyy, mm, 1);
        return moment(day).daysInMonth();

    }


}