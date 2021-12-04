import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Uloge } from 'src/app/models/uloge.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';

@Component({
  selector: 'app-uloge',
  templateUrl: './uloge.component.html',
  styleUrls: ['./uloge.component.css']
})
export class UlogeComponent implements OnInit {

  @ViewChild('ulogeModal', { static: false })
  ulogeModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;

  blukId: string = "";
  uloge: Uloge[] = [];
  uloga: Uloge = new Uloge;
  selectedRole: Uloge = new Uloge;

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }
  
  getRoles(){
    this.service.getRoleList(this.blukId).then(data => {
      this.uloge = data;
    });
  }

  openUlogeModal(data: any){
    this.uloga = data;
    this.ulogeModal.show();
  }

  openConfirmModal(data: any){
    this.selectedRole = data;
    this.confirmModal.show();
  }

  removeRole(data: any){
    var index = this.uloge.findIndex(value=>{
      if(value && value.id == data.id){
        return true;
      }
      return false;
    });
    this.uloge.splice(index,1);
    this.service.deleteRole(data.id);
  }

  saveRole(){
    if(!this.uloga.id || this.uloga.id == 0){
      this.service.addRole(this.uloga).then(data => {
        this.ulogeModal.hide();
        this.getRoles();
      });
    }else{
      this.service.updateRole(this.uloga).then(data => {
        this.ulogeModal.hide();
        this.getRoles();
      });
    }
  }

  resetRole(){
    this.uloga = new Uloge;
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sifrarnik.xlsx');
            });
    });
    e.cancel = true; 
  }

  isDisabled(){
    if(!this.uloga.naziv){
      return true;
    }
    return false;
  }

}
