import { Component, OnInit} from '@angular/core';
import { Day } from '../Models/day-model';
import { DialogShiftComponent } from '../dialog-shift/dialog-shift.component';
import {MatDialog} from '@angular/material/dialog';
import { ShiftService } from '../services/shift.service';
import { ApiService } from '../shared/api.service';
 
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  selectedShift:String='';
  
  today: number = Date.now();
  dt = new Date();
  month = this.dt.getMonth()+1;
  year = this.dt.getFullYear();
  daysInMonth = new Date(this.year, this.month, 0).getDate();

  Days: Day[] = [];
  newDaysArr:any[] =[];

  constructor(public dialog:MatDialog, private data: ShiftService, private api: ApiService) { }

  ngOnInit(): void {
    this.Days = new Array(this.daysInMonth); 
    this.api.getALLDays().subscribe(res=>{
      //if table empty
      if(res.length== 0){

        for(let i=0; i<this.daysInMonth; i++){
          let dayModal = new Day(i+1);
          this.Days[i]=dayModal;
        }
        this.api.postDay(this.Days).subscribe(res=>{
          console.log(res);  
          console.log("Days added successfully")
          },err=>{
            console.log("something went wrong");
          }  );

      }
      else
        this.Days = res[0];
      this.newDaysArr = this.splitArr(this.Days, 3);

    },err=>{
      console.log("something went wrong");
    });
 
  }

  splitArr(arr:  Day[], size: number) {
    let newArr = [];
    for(let i = 0; i< arr.length; i += size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
 }

 openDialog(day:number, shift:string, selectedShiftNumber: number){
  this.data.changeMessage(shift);
  this.data.changeMessageDay(day.toString());
  this.data.changeMessageShiftNumber(selectedShiftNumber);
  this.dialog.open(DialogShiftComponent);
}

  getShiftColor(dayNumber: number, shiftNumber: number){

    let returnedCSS = "btn-warning";
    try{
      if(this.Days[dayNumber-1].shifts[shiftNumber].Doctors.length==3)
      returnedCSS= "btn-success";
    }catch(err){
    }
    return returnedCSS
  }

}
