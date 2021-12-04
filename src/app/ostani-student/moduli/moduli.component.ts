import { Component, OnInit, ViewChild } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Moduli } from 'src/app/models/moduli.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-moduli',
  templateUrl: './moduli.component.html',
  styleUrls: ['./moduli.component.css']
})
export class ModuliComponent implements OnInit {

  @ViewChild('modulModal', { static: false })
  modulModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;

  blukId: string = "";
  moduli: Moduli[] = [];
  modul: Moduli = new Moduli;
  selectedModul: Moduli = new Moduli;

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.getModuls();
  }
  
  getModuls(){
    this.service.getModulsList(this.blukId).then(data => {
      this.moduli = data;
    });
  }

  openModulModal(data: any){
    this.modul = data;
    this.modulModal.show();
  }

  openConfirmModal(data: any){
    this.selectedModul = data;
    this.confirmModal.show();
  }

  removeModul(data: any){
    var index = this.moduli.findIndex(value=>{
      if(value && value.id == data.id){
        return true;
      }
      return false;
    });
    this.moduli.splice(index,1);
    this.service.deleteModul(data.id);
  }

  saveModul(){
    if(!this.modul.id || this.modul.id == 0){
      this.service.addModul(this.modul).then(data => {
        this.modulModal.hide();
        this.getModuls();
      });
    }else{
      this.service.updateModul(this.modul).then(data => {
        this.modulModal.hide();
        this.getModuls();
      });
    }
  }

  resetModul(){
    this.modul = new Moduli;
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Moduli.xlsx');
            });
    });
    e.cancel = true; 
  }

  isDisabled(){
    if(!this.modul.naziv || !this.modul.kratica){
      return true;
    }
    return false;
  }

}
