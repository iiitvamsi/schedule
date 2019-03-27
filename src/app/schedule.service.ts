import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(private http:Http) { }

  search(studioName,localDate){
    let url = "http://13.232.30.248:8081/schedule/check";
    return this.http.post(url,{studioName,localDate}).pipe(map(response=>{
      return response.json();
    }))
  }

  create(date,studioName,startTime,endTime,faculty,assignerName){    
    let studioScheduleSlotList = [
      {
        "startTime":startTime,
        "endTime":endTime,
        "faculty":faculty,
        "assignerName":assignerName
      }
    ]
    let url = "http://13.232.30.248:8081/schedule";
    return this.http.post(url,{date,studioName,
      studioScheduleSlotList
  }).pipe(map(response=>{
    return response.json();
  }))
  }

  edit(studioScheduleId,date,studioName,startTime,endTime,faculty,assingerName){
   let url = "http://13.232.30.248:8081/schedule";
    let studioScheduleSlotList= 
    [
      {
        "studioScheduleSlotId":studioScheduleId,
        "startTime":startTime,
        "endTime":endTime,
        "faculty":faculty,
        "assignerName":assingerName
      }
    ]
    return this.http.put(url,{studioScheduleId,date,studioName,studioScheduleSlotList}).pipe(map(response=>{
      return response.json();
    }))
  }

}
