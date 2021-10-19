import { Component, OnInit } from '@angular/core';
import { Moduli } from 'src/app/models/moduli.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-moduli',
  templateUrl: './moduli.component.html',
  styleUrls: ['./moduli.component.css']
})
export class ModuliComponent implements OnInit {

  blukId: string = "";
  moduli: Moduli[] = [];

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.service.getModulsList(this.blukId).then(data => {
      this.moduli = data;
    });
  }

}
