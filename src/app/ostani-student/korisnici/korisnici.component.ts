import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Korisnici } from 'src/app/models/korisnici.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Uloge } from 'src/app/models/uloge.model';
import { VKorisniciUloge } from 'src/app/models/v-korisnici-uloge.model';

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
  korisnici: VKorisniciUloge[] = [];
  uloge: Uloge[] = [];
  korisnik: VKorisniciUloge = new VKorisniciUloge;
  selectedUser: VKorisniciUloge = new VKorisniciUloge;

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers(){
    this.service.getUsersList(this.blukId).then(data => {
      this.korisnici = data;
    });
  }

  getRoles(){
    this.service.getRoleList(this.blukId).then(data => {
      this.uloge = data;
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
    this.korisnik = new VKorisniciUloge;
  }

  removeKorisnik(data: any){
    var index = this.korisnici.findIndex(value=>{
      if(value && value.korisnikId == data.korisnikId){
        return true;
      }
      return false;
    });
    this.korisnici.splice(index,1);
    this.service.deleteUser(data.korisnikId);
  }

  saveUser(){
    if(!this.korisnik.korisnikId){
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

  isDisabled(){
    if(!this.korisnik.ime || !this.korisnik.prezime || !this.korisnik.jmbag || !this.korisnik.email || !this.korisnik.ulogaId){
      return true;
    }
    return false;
  }

}
