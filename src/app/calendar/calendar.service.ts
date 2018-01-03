import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/toPromise";

import * as moment from 'moment';


@Injectable()

export class CalendarService{
    private api_url = 'api';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ){}

    getWeekDay(yyyy: number, mm: number){
        var day = new Date(yyyy, mm, 1);
        return moment(day).day();
    }

    getDaysInMonth(yyyy: number, mm: number){
        var day = new Date(yyyy, mm, 1);
        return moment(day).daysInMonth();
    }

    getApi(){
        return this.http.get(
            this.api_url
        ).toPromise().then(res=>{
            console.log(res.json());
        });
    }


}