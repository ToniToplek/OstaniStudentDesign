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
    if(localStorage.getItem('token') != null){
      if(this.service.selectedUser?.bulkId){
        this.router.navigateByUrl('/home/'+this.service.selectedUser.bulkId);
      }
    }
  }

  onSubmit(){
    this.service.login(this.korisnik).then(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.service.getUserDataByLoginData().then(data =>{
          if(data && data.id > 0){
            const id = data.bulkId;
            this.service.getRolebyUserId(data.id).then(data =>{
              if(data.naziv.toUpperCase() == "KORISNIK" ){
                this.router.navigate(['home',id]);
                this.toastr.success("Uspješna prijava");
              }else{
                this.router.navigate(['pregledOdabira',id]);
                this.toastr.success("Uspješna prijava");
              }
            });

          }else{
            this.toastr.error("Neuspješna prijava");
          }
        });
      },
      err =>{
        if(err.status == 400){
          this.toastr.error("Neuspješna prijava");
        }else{
          console.log(err);
        }
      }
    );
  }




}
