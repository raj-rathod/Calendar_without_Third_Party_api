import { Injectable } from '@angular/core';
import { Dates } from '../helper/interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }
  getDay(date: Dates): number { 
    const day = (date.day + Math.floor((2.6*date.month)-0.2)
    -2 * date.century + date.year + Math.floor(date.century/4)+Math.floor(date.year/4))%7;
    return day;
  }
}
