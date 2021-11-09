import { Component, OnInit } from '@angular/core';
import { Korisnici } from 'src/app/models/korisnici.model';
import { Predmeti } from 'src/app/models/predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';


@Component({
  selector: 'app-stay-student',
  templateUrl: './stay-student.component.html',
  styleUrls: ['./stay-student.component.css']
})
export class StayStudentComponent implements OnInit {

  blukId: string = "";
  userData: Korisnici;
  predmets: Predmeti[];

  constructor(
    private service: StayStudentService,
  ) { }

  ngOnInit(): void {
    this.service.getUserDataById(this.blukId, 2).then(data => {
      this.userData = data;
    });

    this.service.getPredmetsList(this.blukId).then(data => {
      this.predmets = data;
    });
  }
/*
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.predmets, event.previousIndex, event.currentIndex);
  }
*/
  drop(e){
    
  }
}
