import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KorisniciComponent } from './ostani-student/korisnici/korisnici.component';
import { ModuliComponent } from './ostani-student/moduli/moduli.component';
import { PredmetiComponent } from './ostani-student/predmeti/predmeti.component';
import { PregledOdabiraComponent } from './ostani-student/pregled-odabira/pregled-odabira.component';
import { SifrarnikComponent } from './ostani-student/sifrarnik/sifrarnik.component';
import { StayStudentComponent } from './ostani-student/stay-student/stay-student.component';
import { UlogeComponent } from './ostani-student/uloge/uloge.component';

const routes: Routes = [
  { path: '', component:  StayStudentComponent},
  { path: 'pregledOdabira', component:  PregledOdabiraComponent},
  { path: 'predmeti', component:  PredmetiComponent},
  { path: 'korisnici', component:  KorisniciComponent},
  { path: 'moduli', component:  ModuliComponent},
  { path: 'sifrarnik', component:  SifrarnikComponent},
  { path: 'uloge', component:  UlogeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
