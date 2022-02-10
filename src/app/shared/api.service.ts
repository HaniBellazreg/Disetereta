import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Day } from '../Models/day-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
    postDay(data : any){
      return this.http.post<any>("http://localhost:3000/days", data)
      .pipe(map((res:any)=>{ return res;
      }))
    }

    deleteDay(data : any){
      return this.http.delete("http://localhost:3000/posts/"+data.id)
        .pipe(map((res:any)=>{ return res;
        }))
    }

    updateAllDays(data: any){
      return this.http.put<any>("http://localhost:3000/days/1",data)
        .pipe(map((res:any)=>{ return res;
        }))
    }

    getALLDays(){
          return this.http.get<any>("http://localhost:3000/days").pipe(map(res =><any>res));     
    }

}
