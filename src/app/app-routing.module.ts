import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { KorisniciComponent } from './ostani-student/korisnici/korisnici.component';
import { ModuliComponent } from './ostani-student/moduli/moduli.component';
import { PredmetiComponent } from './ostani-student/predmeti/predmeti.component';
import { PregledOdabiraComponent } from './ostani-student/pregled-odabira/pregled-odabira.component';
import { SifrarnikComponent } from './ostani-student/sifrarnik/sifrarnik.component';
import { StayStudentComponent } from './ostani-student/stay-student/stay-student.component';
import { StudentHomeComponent } from './ostani-student/student-home/student-home.component';
import { UlogeComponent } from './ostani-student/uloge/uloge.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'home/:id', component:  StudentHomeComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Korisnik']}},
  { path: 'select/:id', component:  StayStudentComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Korisnik']}},
  { path: 'pregledOdabira/:id', component:  PregledOdabiraComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Moderator']}},
  { path: 'predmeti/:id', component:  PredmetiComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Moderator']}},
  { path: 'korisnici/:id', component:  KorisniciComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Moderator']}},
  { path: 'moduli/:id', component:  ModuliComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin','Moderator']}},
  { path: 'sifrarnik/:id', component:  SifrarnikComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin']}},
  { path: 'uloge/:id', component:  UlogeComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
