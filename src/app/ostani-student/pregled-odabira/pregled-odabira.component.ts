import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Uloge } from 'src/app/models/uloge.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import saveAs from 'file-saver';
import { VKorisniciUloge } from 'src/app/models/v-korisnici-uloge.model';
import { KorisniciZeljeniModuliDto } from 'src/app/models/korisnici-zeljeni-moduli-dto.model';
import { VKorisniciZeljeniPredmeti } from 'src/app/models/vkorisnici-zeljeni-predmeti.model';
import { Chart, registerables } from 'chart.js'

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
  rppData: number[] = [];
  ksData: number[] = [];
  mmsData: number[] = [];
  isData: number[] = [];

  graph: any;


  constructor(
    private service: StayStudentService
  ) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.service.getUserChoiceList().then(data => {
      this.korisnici = data;
      
      let rppPrvi = 0;
      let rppDrugi = 0;
      let ksPrvi = 0;
      let ksDrugi = 0;
      let mmsPrvi = 0;
      let mmsDrugi = 0;
      let isPrvi = 0;
      let isDrugi = 0;

      data.forEach(element => {
        switch(element.prviIzborModulId){
          case 1: {
            mmsPrvi++;
            break;
          }
          case 2: {
            ksPrvi++;
            break;
          }
          case 3: {
            rppPrvi++;
            break;
          }
          case 4: {
            isPrvi++;
            break;
          }
        }

        switch(element.drugiIzborModulId){
          case 1: {
            mmsDrugi++;
            break;
          }
          case 2: {
            ksDrugi++;
            break;
          }
          case 3: {
            rppDrugi++;
            break;
          }
          case 4: {
            isDrugi++;
            break;
          }
        }
      });

      this.mmsData = [mmsPrvi, mmsDrugi];
      this.ksData = [ksPrvi, ksDrugi];
      this.rppData = [rppPrvi, rppDrugi];
      this.isData = [isPrvi, isDrugi];
      this.graf();
    });
  }

  graf() {
    if(this.graph){
      this.graph.destroy();
    }

    this.graph = new Chart("myChart", {
      type: 'bar',
      data: {
          datasets: [{
              label: 'RPP',
              data: this.rppData,
              backgroundColor: "#98cdaa",
              borderColor: "#007ee7",
          },
          {
            label: 'KS',
            data: this.ksData,
            backgroundColor: "#aac8ff",
            borderColor: "#007ee7",
          },
          {
            label: 'MMS',
            data: this.mmsData,
            backgroundColor: "#ffcc66",
            borderColor: "#007ee7",
          },
          {
            label: 'IS',
            data: this.isData,
            backgroundColor: "#ac6553",
            borderColor: "#007ee7",
          }
        ],
          labels: ['1. izbor', '2. izbor']
      },
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
