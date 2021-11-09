import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Korisnici } from 'src/app/models/korisnici.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  @ViewChild('userModal', { static: false })
  userModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;

  blukId: string = "";
  korisnici: Korisnici[] = [];
  korisnik: Korisnici = new Korisnici;
  selectedUser: Korisnici = new Korisnici;

  constructor(
    private service: StayStudentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUsersList(this.blukId).then(data => {
      this.korisnici = data;
    });
  }

  openUserModal(data: any){
    this.korisnik = data;
    this.userModal.show();
  }

  openConfirmModal(data: any){
    this.selectedUser = data;
    this.confirmModal.show();
  }

  resetKorisnik(){
    this.korisnik = new Korisnici;
  }

  removeKorisnik(data: any){
    var index = this.korisnici.findIndex(value=>{
      if(value && value.id == data.id){
        return true;
      }
      return false;
    });
    this.korisnici.splice(index,1);
    this.service.deleteUser(data.id);
  }

  saveUser(){
    if(!this.korisnik.bulkId){
      this.service.addUser(this.korisnik).then(data => {
        this.userModal.hide();
        this.getUsers();
      });
    }else{
      this.service.updateUser(this.korisnik).then(data => {
        this.userModal.hide();
        this.getUsers();
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Korisnici.xlsx');
            });
    });
    e.cancel = true; 
  }

}
