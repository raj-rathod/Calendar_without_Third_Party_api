import { Component, OnInit } from '@angular/core';
import { Dates } from 'src/app/helper/interface';
import { CalendarService } from '../calendar.service';
import { Days} from 'src/app/helper/constant'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  inputDate?: Dates;
  day?:number;
  days = Days;
  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
  }

  searchDay(input:any): void{
     if(input.value.length>10||input.value.length<10){
       alert("Not valid Date");
     }else{
        const date = input.value.split("/");
        if(date.length>1){
          if(date[0] > 31 || date[0] < 1){
            alert("Invalid Day ");
          }else if(date[1] < 1 || date[1] > 12){
            alert("Invalid month")
          }else if(date[2]<1600){
            alert("Year should be greater than 1599")
          }else{
            if(+date[1]==2){
                if(this.checkLeapYear(+date[2])){
                  if(+date[0]>0 && +date[0]<30){
                    this.inputDate = {
                      day: +date[0],
                      month: this.getMonth(+date[1]),
                      century: Math.floor(+date[2]/100),
                      year: this.getYear(this.getMonth(+date[1]),+date[2]%100)
                    }
                    console.log(this.inputDate);
                    this.day = this.calendarService.getDay(this.inputDate);
                  }else{
                    alert("Invalid day")
                  }
                }else{
                  if(+date[0]>0 && +date[0]<29){
                    this.inputDate = {
                      day: +date[0],
                      month: this.getMonth(+date[1]),
                      century: Math.floor(+date[2]/100),
                      year: this.getYear(this.getMonth(+date[1]),+date[2]%100)
                    }
                    console.log(this.inputDate);
                    this.day = this.calendarService.getDay(this.inputDate);
                  }else{
                    alert("Invalid day")
                  }
                }
            }else{
              this.inputDate = {
                day: +date[0],
                month: this.getMonth(+date[1]),
                century: Math.floor(+date[2]/100),
                year: this.getYear(this.getMonth(+date[1]),+date[2]%100)
              }
              console.log(this.inputDate);
              this.day = this.calendarService.getDay(this.inputDate);
            }
          
          }
        }else{
          alert("Invalid Date");
        }
     }
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

}
