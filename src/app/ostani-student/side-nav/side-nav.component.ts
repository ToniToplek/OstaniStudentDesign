import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  status: boolean = false;
  bulkId: string = '';

  constructor(
    private service: StayStudentService
  ) { }

  ngOnInit(): void {
    this.bulkId = this.service.selectedUserBulkId;
  }
  
  clickEvent(){
      this.status = !this.status;       
  }
}
