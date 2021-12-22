import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Korisnici } from 'src/app/models/korisnici.model';
import { Moduli } from 'src/app/models/moduli.model';
import { Predmeti } from 'src/app/models/predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import { ToastrService } from 'ngx-toastr';
import { OstaniStudentDto } from 'src/app/models/ostani-student-dto.model';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-stay-student',
  templateUrl: './stay-student.component.html',
  styleUrls: ['./stay-student.component.css']
})
export class StayStudentComponent implements OnInit {

  bulkId: string = "";
  userData: Korisnici;
  summerPredmets: Predmeti[] = [];
  winterPredmets: Predmeti[] = [];
  moduls: Moduli[];
  selectedModuls: Moduli[] = [];
  selectedModul: Moduli;
  isModulSelected: boolean = false;
  selectedWinterSubjectsFirstChoice: Predmeti[] = [];
  selectedWinterSubjectsSecondChoice: Predmeti[] = [];
  isWinterSubjectFirstChoiceVisible: boolean = false;
  isWinterSubjectSecondChoiceVisible: boolean = false;
  requiredWinterSubjectsFirstChoice: Predmeti[] = [];
  requiredWinterSubjectsSecondChoice: Predmeti[] = [];

  selectedSummerSubjectsFirstChoice: Predmeti[] = [];
  selectedSummerSubjectsSecondChoice: Predmeti[] = [];
  isSummerSubjectFirstChoiceVisible: boolean = false;
  isSummerSubjectSecondChoiceVisible: boolean = false;
  requiredSummerSubjectsFirstChoice: Predmeti[] = [];
  requiredSummerSubjectsSecondChoice: Predmeti[] = [];
  isUserAlreadyChoice: boolean = false;

  model: OstaniStudentDto[] = [];

  routerSubscription: Subscription;

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
        this.isUserAlrdyChoice();
      }
    })
    this.getModuls();
  }

  isUserAlrdyChoice(){
    this.service.isUserAlreadyChoice(this.bulkId).then(data => {
      this.isUserAlreadyChoice = data;
    });
  }

  getPredemtsFirstChoice(){
    this.service.getRequiredPredmetsList(false, this.selectedModul.id).then(data => {
      if(data){
        data.forEach(element => {
          if(element.jeZimski == true){
            this.winterPredmets.push(element);
          }else{
            this.summerPredmets.push(element);
          }
        });
      }
    });
  }

  getRequiredPredemtsFirstChoice(){
    this.service.getRequiredPredmetsList(true, this.selectedModul.id).then(data => {
      if(data){
        data.forEach(element => {
          if(element.jeZimski == true){
            this.requiredWinterSubjectsFirstChoice.push(element);
          }else{
            this.requiredSummerSubjectsFirstChoice.push(element);
          }        
        });
      }
    });
  }

  getPredemtsSecondChoice(){
    this.service.getRequiredPredmetsList(false, this.selectedModul.id).then(data => {
      if(data){
        data.forEach(element => {
          if(element.jeZimski == true){
            this.winterPredmets.push(element);
          }else{
            this.summerPredmets.push(element);
          }
        });
      }
    });
  }

  getRequiredPredemtsSecondChoice(){
    this.service.getRequiredPredmetsList(true, this.selectedModul.id).then(data => {
      if(data){
        data.forEach(element => {
          if(element.jeZimski == true){
            this.requiredWinterSubjectsSecondChoice.push(element);
          }else{
            this.requiredSummerSubjectsSecondChoice.push(element);
          }        
        });
      }
    });
  }

  getModuls(){
    this.service.getModulsList().then(data => {
      this.moduls = data;
    });
  }
  
  getUserData(){
    this.service.getUserDataByBulkId(this.bulkId).then(data => {
      this.userData = data;
    });
  }


  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  dropSummer(event: CdkDragDrop<string[]>, bool: boolean) {
    
    if (event.previousContainer === event.container) 
    {
      if(bool){
        moveItemInArray(this.summerPredmets, event.previousIndex, event.currentIndex);
      }else{
        moveItemInArray(this.selectedSummerSubjectsFirstChoice, event.previousIndex, event.currentIndex);
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
  
  dropWinter(event: CdkDragDrop<string[]>, bool: boolean) {
    
    if (event.previousContainer === event.container) 
    {
      if(bool){
        moveItemInArray(this.winterPredmets, event.previousIndex, event.currentIndex);
      }else{
        moveItemInArray(this.selectedWinterSubjectsFirstChoice, event.previousIndex, event.currentIndex);
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
    this.selectedWinterSubjectsFirstChoice = [];
    this.selectedSummerSubjectsFirstChoice = [];
    this.requiredWinterSubjectsFirstChoice = [];
    this.requiredSummerSubjectsFirstChoice = [];
    this.selectedModul = null;
    this.isModulSelected = false;
    this.isWinterSubjectFirstChoiceVisible = false;
    this.isSummerSubjectFirstChoiceVisible = false;
    this.summerPredmets = [];
    this.winterPredmets = [];
  }

  cancelSecondChoice(){
    this.selectedWinterSubjectsSecondChoice = [];
    this.selectedSummerSubjectsSecondChoice = [];
    this.selectedModul = this.selectedModuls[0];
    this.isWinterSubjectFirstChoiceVisible = true;
    this.isSummerSubjectFirstChoiceVisible = true;
    this.isWinterSubjectSecondChoiceVisible = false;
    this.isSummerSubjectSecondChoiceVisible = false;
    this.summerPredmets = [];
    this.winterPredmets = [];
  }

  cancelModul(){
    if(this.selectedModuls.length > 0){
      this.selectedModuls = [];
      this.getModuls();
    }else{
      this.router.navigate(['home',this.bulkId])
    }
  }

  selectModuls(){
    this.selectedModul = this.selectedModuls[0];
    this.isModulSelected = true;
    this.isWinterSubjectFirstChoiceVisible = true;
    this.isSummerSubjectFirstChoiceVisible = true;
    this.getPredemtsFirstChoice();
    this.getRequiredPredemtsFirstChoice();
  }

  submitFirstChoice(){
    this.selectedModul = this.selectedModuls[1];
    this.isWinterSubjectFirstChoiceVisible = false;
    this.isSummerSubjectFirstChoiceVisible = false;
    this.isWinterSubjectSecondChoiceVisible = true;
    this.isSummerSubjectSecondChoiceVisible = true;
    this.getPredemtsSecondChoice();
    this.getRequiredPredemtsSecondChoice();
  }

  submitSecondChoice(){
    //first choice
    let i = 0;
    this.selectedWinterSubjectsFirstChoice.forEach(element => {
      i++;
      let choice = new OstaniStudentDto();
      choice.IdKorisnik = this.userData.id;
      choice.IdPredmet = element.id;
      choice.IdModul = this.selectedModuls[0].id;
      choice.Rang = 1;
      choice.BrojIzbora = i;
      this.model.push(choice);
    });
    let x = 0;
    this.selectedSummerSubjectsFirstChoice.forEach(element => {
      x++;
      let choice = new OstaniStudentDto();
      choice.IdKorisnik = this.userData.id;
      choice.IdPredmet = element.id;
      choice.IdModul = this.selectedModuls[0].id;
      choice.Rang = 1;
      choice.BrojIzbora = x;
      this.model.push(choice);
    });

    //second choice
    let j = 0;
    this.selectedWinterSubjectsSecondChoice.forEach(element => {
      j++;
      let choice = new OstaniStudentDto();
      choice.IdKorisnik = this.userData.id;
      choice.IdPredmet = element.id;
      choice.IdModul = this.selectedModuls[1].id;
      choice.Rang = 2;
      choice.BrojIzbora = j;
      this.model.push(choice);
    });

    let y = 0;
    this.selectedSummerSubjectsSecondChoice.forEach(element => {
      y++;
      let choice = new OstaniStudentDto();
      choice.IdKorisnik = this.userData.id;
      choice.IdPredmet = element.id;
      choice.IdModul = this.selectedModuls[1].id;
      choice.Rang = 2;
      choice.BrojIzbora = y;
      this.model.push(choice);
    });

    this.service.saveStudentChoice(this.model).then(data =>{
      this.toastr.success('Uspješno ste spremili svoj odabir!');
      this.isWinterSubjectSecondChoiceVisible = false;
      this.isModulSelected = false;
      this.router.navigate(['home',this.bulkId]);
    });

  }

  modulsSubmitDisabled(){
    if(this.moduls && this.moduls.length > 0){
      return true;
    }
    return false;
  }

  subjectSubmitDisabled(){
    if((this.winterPredmets && this.winterPredmets.length > 0) || (this.summerPredmets && this.summerPredmets.length > 0)){
      return true;
    }
    return false;
  }

  displayExpr(predmet: Predmeti){
    if(this.selectedModuls.length > 0){
      let kratica = this.selectedModuls.find(t => t.id == predmet.idModul);
      if(kratica){
        return predmet.naziv + " (" + kratica.kratica + ")";
      }else{
        return predmet.naziv + " (Izborni)"
      }
    }
  }

  displayRequiredExpr(predmet: Predmeti){
    if(this.selectedModuls.length > 0){
      let kratica = this.selectedModuls.find(t => t.id == predmet.idModul);
      if(kratica){
        return predmet.naziv + " (" + kratica.kratica + ")";
      }else{
        return predmet.naziv + " (Obavezni)"
      }
    }
  }

  color(id: number){
    if(id==1){
      return '#ffcc66'
    }else if(id==2){
      return '#aac8ff'
    }else if(id==3){
      return '#98cdaa'
    }else if(id==4){
      return '#ac6553'
    }else{
      return '#C0C0C0'
    }
  }

}
