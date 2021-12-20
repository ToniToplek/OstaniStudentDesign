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
import { UlogeComponent } from './ostani-student/uloge/uloge.component';

const routes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'home/:id', component:  StayStudentComponent, canActivate:[AuthGuard]},
  { path: 'pregledOdabira/:id', component:  PregledOdabiraComponent, canActivate:[AuthGuard]},
  { path: 'predmeti/:id', component:  PredmetiComponent, canActivate:[AuthGuard]},
  { path: 'korisnici/:id', component:  KorisniciComponent, canActivate:[AuthGuard]},
  { path: 'moduli/:id', component:  ModuliComponent, canActivate:[AuthGuard]},
  { path: 'sifrarnik/:id', component:  SifrarnikComponent, canActivate:[AuthGuard]},
  { path: 'uloge/:id', component:  UlogeComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
