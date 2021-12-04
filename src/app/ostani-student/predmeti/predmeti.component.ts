import { Component, OnInit, ViewChild } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Predmeti } from 'src/app/models/predmeti.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import saveAs from 'file-saver';
import { Moduli } from 'src/app/models/moduli.model';
import { Sifrarnik } from 'src/app/models/sifrarnik.model';

@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {

  @ViewChild('subjectModal', { static: false })
  subjectModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;
  
  blukId: string = "";
  predmeti: Predmeti[] = [];
  isValid: boolean = false;
  moduli: Moduli[] = [];
  sifrarnik: Sifrarnik[] = [];
  predmet: Predmeti = new Predmeti;
  selectedSubject: Predmeti = new Predmeti;
  semestri: any[] = [{isWinter:true, name: 'Zimski'}, {isWinter:false, name: 'Ljetni'}]

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(){
    this.service.getPredmetsList(this.blukId).then(data => {
      this.predmeti = data;
    });
    this.service.getModulsList(this.blukId).then(data => {
      this.moduli = data;
    });
    this.service.getSifrarnikList(this.blukId).then(data => {
      this.sifrarnik = data;
    });
  }

  openSubjectModal(data: any){
    this.predmet = data;
    this.subjectModal.show();
  }

  openConfirmModal(data: any){
    this.selectedSubject = data;
    this.confirmModal.show();
  }

  removeSubject(data: any){
    var index = this.predmeti.findIndex(value=>{
      if(value && value.id == data.id){
        return true;
      }
      return false;
    });
    this.predmeti.splice(index,1);
    this.service.deleteSubject(data.id);
  }

  resetPredmet(){
    this.predmet = new Predmeti;
  }

  saveSubject(){
    if(!this.predmet.id || this.predmet.id == 0){
      this.service.addSubject(this.predmet).then(data => {
        this.subjectModal.hide();
        this.getSubjects();
      });
    }else{
      this.service.updateSubject(this.predmet).then(data => {
        this.subjectModal.hide();
        this.getSubjects();
      });
    }
  }

  onExporting(e) {
    const workbook = new Workbook();    
    const worksheet = workbook.addWorksheet('Main sheet');
    exportDataGrid({
        component: e.component,
        worksheet: worksheet
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer: BlobPart) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Predmeti.xlsx');
            });
    });
    e.cancel = true; 
  }

  isDisabled(){
    if(!this.predmet.naziv || !this.predmet.idSifrarnik || !this.isValid){
      return true;
    }
    return false;
  }

  isValidCheck(){
    if(this.predmet){
      let sif = this.sifrarnik.find(t => t.id == this.predmet.idSifrarnik);
      if(sif.zahtijevaModul && !this.predmet.idModul){
        this.isValid = false;
      }else{
        this.isValid = true;
      }
    }
  }

}
