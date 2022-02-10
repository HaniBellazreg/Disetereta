import { Shift } from "./shift-model";

export class Day{

    dayNumber: number;
    shifts: Shift[] = [];

    constructor(dayNumber:number){
    this.dayNumber = dayNumber;
    }

    public AddShift(shift:Shift){
        this.shifts.push(shift);
    }
}