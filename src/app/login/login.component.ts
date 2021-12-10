import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Korisnici } from '../models/korisnici.model';
import { StayStudentService } from '../service/stay-student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnik: Korisnici = new Korisnici;

  constructor(
    private service: StayStudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.getUserDataByLoginData(this.korisnik).then(data =>{
      if(data && data.id > 0){
        const id = data.bulkId;
        this.router.navigate(['home',id]);
        this.toastr.success("Uspješna prijava");
      }else{
        this.toastr.error("Neuspješna prijava");
      }
    });
    
  }

}
