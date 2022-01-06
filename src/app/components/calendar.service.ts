import { Injectable } from '@angular/core';
import { Monthdays } from '../helper/constant';
import { ActionKey, Dates, Months } from '../helper/interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  monthDays = Monthdays;
  startDay = 0;
  totalDays = 0;
  totalDaysPreviousMonth = 0;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth() + 1;
  currentYear = this.currentDate.getFullYear();
  currentDay = this.currentDate.getDate();
  months: Months[] = [];
  
  constructor() {
  }

  setCalendarData(month: number, year: number) : void {
    this.months = [];
     const date:Dates = {
       day:1,
       month:this.getMonth(month),
       century: Math.floor(year / 100),
       year:this.getYear(this.getMonth(month), year % 100)
     }
     this.startDay = this.getDay(date);
     this.totalDays = this.getMonthDays(month, year);
     this.totalDaysPreviousMonth = this.getPreviousMonthDays(month, year);
     const totalWeeks = Math.ceil((this.totalDays+this.startDay)/7);
     let previousDay = 1;
     let currentDay = 1;
     let preDay = this.startDay-1;
     let nextDay = 1;
     for(let i = 0; i < totalWeeks; i++) {
       const weekObj: Months={
         days:[],
         keys: [],
       };
       let actionKey:ActionKey = {
         isActive: false,
         isPrevious: false,
         isNext: false
       }
       for(let i = 0; i < 7; i++) {
         if(previousDay <= this.startDay){
           weekObj.days.push(this.totalDaysPreviousMonth - preDay);
           actionKey = {
             isActive: false,
             isPrevious: true,
             isNext: false
           }
           weekObj.keys.push(actionKey);
           previousDay++;
           preDay--;
         }else if( currentDay > this.totalDays){
           weekObj.days.push(nextDay);
           nextDay++;
           actionKey = {
             isActive: false,
             isPrevious: false,
             isNext: true
           }
           weekObj.keys.push(actionKey);
         }else{
           weekObj.days.push(currentDay);
           if(currentDay == this.currentDay && month == this.currentMonth && year == this.currentYear){
            actionKey={
              isActive: true,
              isPrevious: false,
              isNext: false
            }
           }else{
            actionKey={
              isActive: false,
              isPrevious: false,
              isNext: false
            }
           }
          
           currentDay++;
           weekObj.keys.push(actionKey);

         }
       }
       this.months.push(weekObj);
     }
  }
  
  getDay(date: Dates): number { 
    let day = (date.day + Math.floor(2.6*date.month-0.2)-2 * date.century + date.year + Math.floor(date.century/4)+Math.floor(date.year/4))%7;
    day = ((day % 7) + 7) % 7;
    return day;
  }

  getMonthData(month: number, year: number): Months[]{
    this.setCalendarData(month, year);
    return this.months;
  }

  getMonth(month: number): number{
    switch(month-2){
      case -1: return 11;
      case 0 : return 12;
      default: return month-2;
    }
  }

  getYear(month: number,year: number): number{
    if(month>10){
      return year-1;
    }else{
      return year;
    }
  }

  checkLeapYear(year: number): boolean{
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true;
    } else { 
        return false;
    }
  }

  getMonthDays(month: number, year: number): number{
    if(month == 2 && this.checkLeapYear(year)){
      return this.monthDays[month - 1]+1;
    }
    else return this.monthDays[month-1];
  }

  getPreviousMonthDays(month: number, year: number): number{
    if(month-1 < 1){
      return this.getMonthDays(12,year);
    }else{
      return this.getMonthDays(month-1, year);
    }
  }
}
