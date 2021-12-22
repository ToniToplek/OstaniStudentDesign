import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Korisnici } from 'src/app/models/korisnici.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  routerSubscription: Subscription;
  bulkId: string = "";
  userData: Korisnici;
  isUserAlreadyChoice: boolean = false;

  constructor(
    private service: StayStudentService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.bulkId = params.get('id');
        this.getUserData();
        this.isUserAlrdyChoice();
      }
    })
  }

  getUserData(){
    this.service.getUserDataByBulkId(this.bulkId).then(data => {
      this.userData = data;
    });
  }

  isUserAlrdyChoice(){
    this.service.isUserAlreadyChoice(this.bulkId).then(data => {
      this.isUserAlreadyChoice = data;
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  goOnSelect(){
    this.router.navigate(['select',this.bulkId])
  }

  goOnReview(){
    this.router.navigate(['review',this.bulkId])
  }


}
