import { Doctor } from './doctor-model';
export class Shift{

    Periode: string;
    Doctors: Doctor[] = [];
    constructor(Periode:string){
    this.Periode = Periode;
    }

    public AddDoctor(doctor:Doctor){
        this.Doctors.push(doctor);
    }
}