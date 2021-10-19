import { Component, OnInit } from '@angular/core';
import { Sifrarnik } from 'src/app/models/sifrarnik.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-sifrarnik',
  templateUrl: './sifrarnik.component.html',
  styleUrls: ['./sifrarnik.component.css']
})
export class SifrarnikComponent implements OnInit {

  blukId: string = "";
  sifrarnik: Sifrarnik[] = [];

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.service.getSifrarnikList(this.blukId).then(data => {
      this.sifrarnik = data;
    });
  }
}
