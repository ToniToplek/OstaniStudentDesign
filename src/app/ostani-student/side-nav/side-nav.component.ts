import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  routerSubscription: any;

  constructor(
    private service: StayStudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.bulkId = params.get('id');
      }
    })
  }
  
  clickEvent(){
      this.status = !this.status;       
  }

  getLink(name: string){
    return "/"+name+"/"+this.bulkId;
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.toastr.success("Uspješna odjava");
  }
}
