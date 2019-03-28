import { ScheduleService } from './../schedule.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  startTime:any;
  
  constructor(private scheduleService:ScheduleService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  search(){
    this.scheduleService.search(this.model.studio,this.model.date).subscribe(data=>{
      this.searchData = data;      
      this.createSchedule = false;
    },(error)=>{
      this.createSchedule = true;
    })
  }


  create(){
    console.log(this.model.date);
    // console.log(this.model.date,this.model.studioName,this.model.startTime,this.model.endTime,this.model.faculty,this.model.assignerName)
    this.scheduleService.create(this.model.date,this.model.studio,this.model.startTime,
      this.model.endTime,this.model.faculty,this.model.assignerName).subscribe(data=>{
        this.postResponse = data.responseMsg;
      })
  }

  edit(){
    // this.cdRef.detectChanges();
    this.editResponse = true;
    this.createSchedule = false;
    this.model.startTime = this.searchData.studioScheduleSlotList[0].startTime;
    this.model.endTime = this.searchData.studioScheduleSlotList[0].endTime;
    this.model.assignerName = this.searchData.studioScheduleSlotList[0].assignerName;
    this.model.faculty = this.searchData.studioScheduleSlotList[0].faculty;
    // this.cdRef.detectChanges();
  }

  update(){
    this.scheduleService.edit(this.searchData.studioScheduleId,this.searchData.date,
      this.searchData.studioName,this.model.startTime,
      this.model.endTime,this.model.faculty,
      this.model.assignerName).subscribe(data=>{
        this.editResponse = data.responseMsg;
      })
  }

  dispalyForm(){
    this.createSchedule = true;
    this.editResponse = false;
  }

  // edit(id,date,studioName,startTime,endTime,faculty,assingerName){
  //   console.log(this.searchData)
  //   console.log(id,date,studioName,startTime,endTime,faculty,assingerName)
  //   this.scheduleService.edit(id,date,studioName,startTime,endTime,faculty,assingerName).subscribe(data=>{
  //     console.log(data);
  //   })
  // }

}
