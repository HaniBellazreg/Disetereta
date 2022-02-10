import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import { Day } from '../Models/day-model';
import { Doctor } from '../Models/doctor-model';
import { Shift } from '../Models/shift-model';
import { ShiftService } from '../services/shift.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-dialog-shift',
  templateUrl: './dialog-shift.component.html',
  styleUrls: ['./dialog-shift.component.css']
})
export class DialogShiftComponent implements OnInit {

  selectedShift:string="";
  selectedShiftNumber:number=1;
  selectedDayNumber:string="0";
  Days: Day[] = [];
  shifts: Shift[] = [];
  fDoctor:String="";
  sDoctor:String="";
  tDoctor:String="";


  constructor(public dialog:MatDialog, private data: ShiftService, private api: ApiService, private router:Router) { }

  ngOnInit(): void { 
    this.data.selectedShift.subscribe(message=>this.selectedShift=message);
    this.data.selectedDayNumber.subscribe(message=>this.selectedDayNumber=message);
    this.data.selectedShiftNumber.subscribe(message=>this.selectedShiftNumber=message);

    console.log("Shift Name: "+this.selectedShift);
    console.log("Shift number: "+this.selectedShiftNumber);
    console.log("Day: "+this.selectedDayNumber);

        this.api.getALLDays().subscribe(res=>{
            this.Days = res[0];
            console.log(this.Days);
            try {
              this.shifts =  this.Days[parseInt(this.selectedDayNumber)-1].shifts;
            this.fDoctor = this.Days[parseInt(this.selectedDayNumber)-1].shifts[this.selectedShiftNumber].Doctors[0].Name;
            this.sDoctor = this.Days[parseInt(this.selectedDayNumber)-1].shifts[this.selectedShiftNumber].Doctors[1].Name;
            this.tDoctor = this.Days[parseInt(this.selectedDayNumber)-1].shifts[this.selectedShiftNumber].Doctors[2].Name;
          
            }catch(error){
              console.log("Shifts Incomplete");
            }
            },err=>{
            console.log("something went wrong");
          })

         
  }

  saveDoctors(fDoctor:string, sDoctor:String, tDoctor:String, ){
    let shift = new Shift(this.selectedShift);
    
    if(fDoctor!=null && fDoctor!='')
      shift.AddDoctor(new Doctor(fDoctor));

    if(sDoctor!=null && sDoctor!='')
      shift.AddDoctor(new Doctor(sDoctor));

    if(tDoctor!=null && tDoctor!='')
      shift.AddDoctor(new Doctor(tDoctor));

      
      this.shifts[this.selectedShiftNumber] = shift;
      console.log(this.shifts);
      //this.Days[ parseInt(this.selectedDayNumber)].shifts[this.selectedShiftNumber]=shift;
      this.Days[ parseInt(this.selectedDayNumber)-1].shifts = this.shifts;
      console.log(this.Days);
      this.api.updateAllDays(this.Days).subscribe();
      let currentUrl = this.router.url;
      window.location.reload();
      this.dialog.closeAll();
  }



}
