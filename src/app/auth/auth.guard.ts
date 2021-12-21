import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StayStudentService } from '../service/stay-student.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private service: StayStudentService,
    private toastr: ToastrService,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token') != null){
        let roles = route.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this.service.roleMatch(roles)){
            return true;
          }else{
            this.toastr.error("Nemate prava za odabranu akciju!")
            return false;
          }
        }
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
    return true;
  }
  
}
