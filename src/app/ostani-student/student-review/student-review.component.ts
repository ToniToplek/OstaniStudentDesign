import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { KorisniciZeljeniModuliDto } from 'src/app/models/korisnici-zeljeni-moduli-dto.model';
import { Korisnici } from 'src/app/models/korisnici.model';
import { VKorisniciZeljeniPredmeti } from 'src/app/models/vkorisnici-zeljeni-predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-student-review',
  templateUrl: './student-review.component.html',
  styleUrls: ['./student-review.component.css']
})
export class StudentReviewComponent implements OnInit {

  userData: Korisnici;
  routerSubscription: Subscription;
  bulkId: string = "";
  odabir: VKorisniciZeljeniPredmeti;


  korisnici: KorisniciZeljeniModuliDto[] = [];
  korisnik: KorisniciZeljeniModuliDto = new KorisniciZeljeniModuliDto;
  selectedUser: KorisniciZeljeniModuliDto = new KorisniciZeljeniModuliDto;
  winter: VKorisniciZeljeniPredmeti[] =[];
  summer: VKorisniciZeljeniPredmeti[] =[];
  winterSecond: VKorisniciZeljeniPredmeti[] =[];
  summerSecond: VKorisniciZeljeniPredmeti[] =[];
  selectedModulNameFirst: string = '?';
  selectedModulNameSecond: string = '?';

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
      }
    })
  }

  getUserData(){
    this.service.getUserDataByBulkId(this.bulkId).then(data => {
      this.userData = data;
      this.getPredmetsData();
      this.getModulsData();
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  getPredmetsData(){
    this.service.getUserChoicePredmets(this.userData.id, 1).then(data => {
      data.forEach(element => {
        if(element.jeZimski){
          this.winter.push(element);
        }else{
          this.summer.push(element);
        }
      });
    });

    this.service.getUserChoicePredmets(this.userData.id, 2).then(data => {
      data.forEach(element => {
        if(element.jeZimski){
          this.winterSecond.push(element);
        }else{
          this.summerSecond.push(element);
        }
      });
    });
  }

  getModulsData(){
    this.service.getUserModulChoice(this.userData.id).then(data => {
      this.selectedModulNameFirst = data.prviIzbor;
      this.selectedModulNameSecond = data.drugiIzbor;
    });
  }
  
  getModulName(data: any){
    if(data.modul){
      return data.modul + " (" +  data.kratica +")"
    }else{
      return 'Zajednički izborni predmet'
    }
  }

  goOnRedo(){
    this.router.navigate(['select',this.bulkId]);
  }

  cancel(){
    this.router.navigate(['home',this.bulkId]);
  }

}
