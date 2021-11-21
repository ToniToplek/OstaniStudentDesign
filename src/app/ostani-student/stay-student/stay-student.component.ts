import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  selectedSubjectsFirstChoice: Predmeti[] = [];
  selectedSubjectsSecondChoice: Predmeti[] = [];
  selectedModuls: Moduli[] = [];
  selectedModul: Moduli;
  isModulSelected: boolean = false;
  isSubjectFirstChoiceVisible: boolean = false;
  isSubjectSecondChoiceVisible: boolean = false;
  requiredSubjectsFirstChoice: Predmeti[] = [];
  requiredSubjectsSecondChoice: Predmeti[] = [];

  constructor(
    private service: StayStudentService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getModuls();
  }

  getPredemtsFirstChoice(){
    this.service.getRequiredPredmetsList(this.blukId, false, this.selectedModul.id).then(data => {
      this.predmets = data;
    });
  }
  getRequiredPredemtsFirstChoice(){
    this.service.getRequiredPredmetsList(this.blukId, true, this.selectedModul.id).then(data => {
      this.requiredSubjectsFirstChoice = data;
    });
  }

  
  getPredemtsSecondChoice(){
    this.service.getRequiredPredmetsList(this.blukId, false, this.selectedModul.id).then(data => {
      this.predmets = data;
    });
  }
  getRequiredPredemtsSecondChoice(){
    this.service.getRequiredPredmetsList(this.blukId, true, this.selectedModul.id).then(data => {
      this.requiredSubjectsSecondChoice = data;
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
        moveItemInArray(this.selectedSubjectsFirstChoice, event.previousIndex, event.currentIndex);
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

  cancelFirstChoice(){
    this.selectedSubjectsFirstChoice = [];
    this.selectedModul = null;
    this.isModulSelected = false;
    this.isSubjectFirstChoiceVisible = false;
  }

  cancelSecondChoice(){
    this.selectedSubjectsSecondChoice = [];
    this.selectedModul = this.selectedModuls[0];
    this.isSubjectFirstChoiceVisible = true;
    this.isSubjectSecondChoiceVisible = false;
  }

  cancelModul(){
    this.selectedModuls = [];
    this.getModuls();
  }

  selectModuls(){
    this.selectedModul = this.selectedModuls[0];
    this.isModulSelected = true;
    this.isSubjectFirstChoiceVisible = true;
    this.getPredemtsFirstChoice();
    this.getRequiredPredemtsFirstChoice();
  }

  submitFirstChoice(){
    this.selectedModul = this.selectedModuls[1];
    this.isSubjectFirstChoiceVisible = false;
    this.isSubjectSecondChoiceVisible = true;
    this.getPredemtsSecondChoice();
    this.getRequiredPredemtsSecondChoice();
  }

  submitSecondChoice(){

  }

  modulsSubmitDisabled(){
    if(this.moduls.length > 0){
      return true;
    }
    return false;
  }

}
