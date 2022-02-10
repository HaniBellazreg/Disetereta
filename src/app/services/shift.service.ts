import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ShiftService{

    private messageSource = new BehaviorSubject<string>("default message");
    selectedShift  = this.messageSource.asObservable();

    private messageSourceOfDay = new BehaviorSubject<string>("0");
    selectedDayNumber  = this.messageSourceOfDay.asObservable();

    private messageSourceShiftNumber = new BehaviorSubject<number>(1);
    selectedShiftNumber = this.messageSourceShiftNumber.asObservable();

    constructor(){}

    changeMessage(message : string){
        this.messageSource.next(message);
    }

    changeMessageDay(message : string){
        this.messageSourceOfDay.next(message);
    }

    changeMessageShiftNumber(shiftNumber: number){
        this.messageSourceShiftNumber.next(shiftNumber);
    }
}