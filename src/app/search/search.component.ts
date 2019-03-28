import { ScheduleService } from './../schedule.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  model: any = {};
  postResponse:any;
  searchData:any = [];
  displayTable:boolean = false;
  createSchedule:boolean = false;
  editResponse:boolean = false;

  constructor(private scheduleService:ScheduleService) { }

  ngOnInit() {
  }

  search(){
    this.scheduleService.search(this.model.studio,this.model.date).subscribe(data=>{
      this.searchData = data;
      console.log(this.searchData);
     
      if(this.searchData == null){
        this.createSchedule = true;
      }else{
        this.createSchedule = false;
      }
    })
  }


  create(){
    this.scheduleService.create(this.model.date,this.model.studioName,this.model.startTime,
      this.model.endTime,this.model.faculty,this.model.assignerName).subscribe(data=>{
        this.postResponse = data.responseMsg;
      })
  }

  edit(){
    console.log(this.searchData)
    this.scheduleService.edit(this.searchData.studioScheduleId,this.searchData.date,
      this.searchData.studioName,this.searchData.studioScheduleSlotList[0].startTime,
      this.searchData.studioScheduleSlotList[0].endTime,this.searchData.studioScheduleSlotList[0].faculty,
      this.searchData.studioScheduleSlotList[0].assingerName).subscribe(data=>{
        this.editResponse = data.responseMsg;
      })
  }

}
