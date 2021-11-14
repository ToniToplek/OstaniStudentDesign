import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Korisnici } from 'src/app/models/korisnici.model';
import { Moduli } from 'src/app/models/moduli.model';
import { Predmeti } from 'src/app/models/predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';


@Component({
  selector: 'app-stay-student',
  templateUrl: './stay-student.component.html',
  styleUrls: ['./stay-student.component.css']
})
export class StayStudentComponent implements OnInit {

  blukId: string = "";
  userData: Korisnici;
  predmets: Predmeti[];
  moduls: Moduli[];
  selectedSubjects: Predmeti[] = [];
  selectedModuls: Moduli[] = [];
  selectedModul: Moduli;
  isModulSelected: boolean = false;
  requiredSubjects: Predmeti[] = [];

  constructor(
    private service: StayStudentService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getModuls();
  }

  getPredemts(){
    this.service.getPredmetsList(this.blukId).then(data => {
      this.predmets = data;
    });
  }
  getRequiredPredemts(){
    this.service.getPredmetsList(this.blukId).then(data => {
      this.requiredSubjects = data;
    });
  }

  getModuls(){
    this.service.getModulsList(this.blukId).then(data => {
      this.moduls = data;
    });
  }

  getUserData(){
    this.service.getUserDataById(this.blukId, 2).then(data => {
      this.userData = data;
    });
  }

  drop(event: CdkDragDrop<string[]>, bool: boolean) {
    
    if (event.previousContainer === event.container) 
    {
      if(bool){
        moveItemInArray(this.predmets, event.previousIndex, event.currentIndex);
      }else{
        moveItemInArray(this.selectedSubjects, event.previousIndex, event.currentIndex);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dropModul(event: CdkDragDrop<string[]>, bool: boolean) {
    
    if (event.previousContainer === event.container) 
    {
      if(bool){
        moveItemInArray(this.moduls, event.previousIndex, event.currentIndex);
      }else{
        moveItemInArray(this.selectedModuls, event.previousIndex, event.currentIndex);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  evenPredicate() {
    if(this.selectedSubjects == null ||  this.selectedSubjects.length < 3){
      return true;
    }
    return false;
  }

  cancel(){
    this.selectedSubjects = [];
    this.selectedModul = null;
    this.isModulSelected = false;
  }

  cancelModul(){
    this.selectedModuls = [];
    this.getModuls();
  }

  selectModuls(){
    this.selectedModul = this.selectedModuls[0];
    this.isModulSelected = true;
    this.getPredemts();
    this.getRequiredPredemts();
  }

  save(){

  }

  modulsSubmitDisabled(){
    if(this.moduls.length > 0){
      return true;
    }
    return false;
  }

}
