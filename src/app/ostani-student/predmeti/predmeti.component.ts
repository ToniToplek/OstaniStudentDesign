import { Component, OnInit } from '@angular/core';
import { Predmeti } from 'src/app/models/predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {

  blukId: string = "";
  predmeti: Predmeti[] = [];

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.service.getPredmetsList(this.blukId).then(data => {
      this.predmeti = data;
    });
  }
}
