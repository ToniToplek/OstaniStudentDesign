import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StayStudentComponent } from './ostani-student/stay-student/stay-student.component';
import { StayStudentAdminComponent } from './ostani-student/stay-student-admin/stay-student-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    StayStudentComponent,
    StayStudentAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
