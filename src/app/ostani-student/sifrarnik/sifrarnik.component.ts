import { Component, OnInit, ViewChild } from '@angular/core';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Sifrarnik } from 'src/app/models/sifrarnik.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import saveAs from 'file-saver';

@Component({
  selector: 'app-sifrarnik',
  templateUrl: './sifrarnik.component.html',
  styleUrls: ['./sifrarnik.component.css']
})
export class SifrarnikComponent implements OnInit {

  @ViewChild('sifrarnikModal', { static: false })
  sifrarnikModal: ModalDirective;

  @ViewChild('confirmModal', { static: false })
  confirmModal: ModalDirective;


  blukId: string = "";
  sifrarnik: Sifrarnik[] = [];
  sifrarnikItem: Sifrarnik = new Sifrarnik;
  selectedSifrarnikItem: Sifrarnik = new Sifrarnik;

  constructor(
    private service: StayStudentService
  ) {}

  ngOnInit(): void {
    this.getSifrarnik();
  }
  
  getSifrarnik(){
    this.service.getSifrarnikList().then(data => {
      this.sifrarnik = data;
    });
  }

  openSifrarnikModal(data: any){
    this.sifrarnikItem = data;
    this.sifrarnikModal.show();
  }

  openConfirmModal(data: any){
    this.selectedSifrarnikItem = data;
    this.confirmModal.show();
  }

  removeSifrarnikItem(data: any){
    var index = this.sifrarnik.findIndex(value=>{
      if(value && value.id == data.id){
        return true;
      }
      return false;
    });
    this.sifrarnik.splice(index,1);
    this.service.deleteSifrarnikItem(data.id);
  }

  saveSifrarnikItem(){
    if(!this.sifrarnikItem.id || this.sifrarnikItem.id == 0){
      this.service.addSifrarnikItem(this.sifrarnikItem).then(data => {
        this.sifrarnikModal.hide();
        this.getSifrarnik();
      });
    }else{
      this.service.updateSifrarnikItem(this.sifrarnikItem).then(data => {
        this.sifrarnikModal.hide();
        this.getSifrarnik();
      });
    }
  }

  resetSifrarnikItem(){
    this.sifrarnikItem = new Sifrarnik;
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
    if(!this.sifrarnikItem.naziv){
      return true;
    }
    return false;
  }

  getRequiredText(data: any){
    if(data && data.zahtijevaModul){
      return 'Da';
    }
    return 'Ne';
  }

}
