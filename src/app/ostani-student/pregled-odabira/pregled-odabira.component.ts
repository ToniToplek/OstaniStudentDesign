import { Component, OnInit, ViewChild } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Uloge } from 'src/app/models/uloge.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import saveAs from 'file-saver';
import { VKorisniciUloge } from 'src/app/models/v-korisnici-uloge.model';
import { KorisniciZeljeniModuliDto } from 'src/app/models/korisnici-zeljeni-moduli-dto.model';
import { VKorisniciZeljeniPredmeti } from 'src/app/models/vkorisnici-zeljeni-predmeti.model';

@Component({
  selector: 'app-pregled-odabira',
  templateUrl: './pregled-odabira.component.html',
  styleUrls: ['./pregled-odabira.component.css']
})
export class PregledOdabiraComponent implements OnInit {
  
  @ViewChild('firstChoiceModal', { static: false })
  firstChoiceModal: ModalDirective;

  @ViewChild('secondChoiceModal', { static: false })
  secondChoiceModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;

  blukId: string = "";
  korisnici: KorisniciZeljeniModuliDto[] = [];
  korisnik: KorisniciZeljeniModuliDto = new KorisniciZeljeniModuliDto;
  selectedUser: KorisniciZeljeniModuliDto = new KorisniciZeljeniModuliDto;
  winter: VKorisniciZeljeniPredmeti[] =[];
  summer: VKorisniciZeljeniPredmeti[] =[];
  winterSecond: VKorisniciZeljeniPredmeti[] =[];
  summerSecond: VKorisniciZeljeniPredmeti[] =[];


  constructor(
    private service: StayStudentService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUserChoiceList(this.blukId).then(data => {
      this.korisnici = data;
    });
  }


  showFirstChoiceModal(data: any){
    this.winter = [];
    this.summer = [];
    this.korisnik = data;
    this.service.getUserChoicePredmets(data.idKorisnik, 1).then(data => {
      data.forEach(element => {
        if(element.jeZimski){
          this.winter.push(element);
        }else{
          this.summer.push(element);
        }
      });
    });
    this.firstChoiceModal.show();
  }

  showSecondChoice(){
    this.winterSecond = [];
    this.summerSecond = [];
    this.service.getUserChoicePredmets(this.korisnik.idKorisnik, 2).then(data => {
      data.forEach(element => {
        if(element.jeZimski){
          this.winterSecond.push(element);
        }else{
          this.summerSecond.push(element);
        }
      });
    });
    this.firstChoiceModal.hide();
    this.secondChoiceModal.show();
  }

  openConfirmModal(data: any){
    this.selectedUser = data;
    this.confirmModal.show();
  }

  removeKorisnikChoice(data: any){
    var index = this.korisnici.findIndex(value=>{
      if(value && value.idKorisnik == data.idKorisnik){
        return true;
      }
      return false;
    });
    this.korisnici.splice(index,1);
    this.service.deleteUserChoice(data.idKorisnik);
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
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Rezultati_odabira.xlsx');
            });
    });
    e.cancel = true; 
  }

  getModulName(data: any){
    if(data.modul){
      return data.modul + " (" +  data.kratica +")"
    }else{
      return 'Zajednički izborni predmet'
    }
  }

}
