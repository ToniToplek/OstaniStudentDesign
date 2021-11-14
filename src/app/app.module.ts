import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DevExtremeModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StayStudentComponent } from './ostani-student/stay-student/stay-student.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavComponent } from './ostani-student/side-nav/side-nav.component';
import { KorisniciComponent } from './ostani-student/korisnici/korisnici.component';
import { PredmetiComponent } from './ostani-student/predmeti/predmeti.component';
import { ModuliComponent } from './ostani-student/moduli/moduli.component';
import { SifrarnikComponent } from './ostani-student/sifrarnik/sifrarnik.component';
import { UlogeComponent } from './ostani-student/uloge/uloge.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    StayStudentComponent,
    SideNavComponent,
    KorisniciComponent,
    PredmetiComponent,
    ModuliComponent,
    SifrarnikComponent,
    UlogeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DevExtremeModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
