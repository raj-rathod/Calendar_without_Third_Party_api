import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActionKey, Dates, Months } from 'src/app/helper/interface';
import { CalendarService } from '../calendar.service';
import { Days, MonthNames} from 'src/app/helper/constant'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit,AfterViewInit {
  inputDate?: Dates;
  day?:number;
  days = Days;
  dayshowLimit = 3;
  monthsName = MonthNames;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth()+1;
  months?: Months[];
  constructor(
    private calendarService: CalendarService,
    private elRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.months = this.calendarService.getMonthData(this.currentMonth, this.currentYear);
    let viewportWidth = window.innerWidth;
    if( viewportWidth < 500 ){
        this.dayshowLimit = 1;
    }
  }
  ngAfterViewInit(): void{
    this.selectMonth(this.currentMonth-1, this.currentMonth);
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
                if(this.calendarService.checkLeapYear(+date[2])){
                  if(+date[0]>0 && +date[0]<30){
                    this.inputDate = {
                      day: +date[0],
                      month: this.calendarService.getMonth(+date[1]),
                      century: Math.floor(+date[2]/100),
                      year: this.calendarService.getYear(this.calendarService.getMonth(+date[1]),+date[2]%100)
                    }
                    this.day = this.calendarService.getDay(this.inputDate);
                  }else{
                    alert("Invalid day")
                  }
                }else{
                  if(+date[0]>0 && +date[0]<29){
                    this.inputDate = {
                      day: +date[0],
                      month: this.calendarService.getMonth(+date[1]),
                      century: Math.floor(+date[2]/100),
                      year: this.calendarService.getYear(this.calendarService.getMonth(+date[1]),+date[2]%100)
                    }
                    this.day = this.calendarService.getDay(this.inputDate);
                  }else{
                    alert("Invalid day")
                  }
                }
            }else{
              this.inputDate = {
                day: +date[0],
                month: this.calendarService.getMonth(+date[1]),
                century: Math.floor(+date[2]/100),
                year: this.calendarService.getYear(this.calendarService.getMonth(+date[1]),+date[2]%100)
              }
              this.day = this.calendarService.getDay(this.inputDate);
            }
          
          }
        }else{
          alert("Invalid Date");
        }
     }
  }



  nextMonth(): void{
    if(this.currentMonth+1 > 12){
      this.currentMonth = 1;
      this.currentYear++;
    }else{
      this.currentMonth++;
    }
    this.months = this.calendarService.getMonthData(this.currentMonth, this.currentYear);
  }

  prevMonth(): void{
    if(this.currentMonth-1 < 1){
      this.currentMonth = 12;
      this.currentYear--;
    }else{
      this.currentMonth--;
    }
    this.months = this.calendarService.getMonthData(this.currentMonth, this.currentYear);
  }
  nextYear(): void{
    this.currentYear++;
    this.currentMonth = 1;
    this.selectMonth(this.currentMonth-1, this.currentMonth);
  }

  prevYear(): void{
   this.currentYear--;
   this.currentMonth = 1;
   this.selectMonth(this.currentMonth-1, this.currentMonth);
  }

  selectMonth(index: number, month: number): void{
    const monthRef =  this.elRef.nativeElement.querySelectorAll('.select-month');
    for(let i = 0; i < monthRef.length; i++){
      if(index === i){
        monthRef[i].className = "rounded-btn-active mb-3 py-2 select-month";
        this.currentMonth = month;
        this.months = this.calendarService.getMonthData(this.currentMonth, this.currentYear);
      }else{
        monthRef[i].className = "rounded-btn mb-3 py-2 select-month";
      }
    }
  }

  dateSelect(keys: ActionKey): void{
    if(keys.isNext){
      this.nextMonth();
    }else if(keys.isPrevious){
      this.prevMonth();
    }else{
      return;
    }
  }

}
