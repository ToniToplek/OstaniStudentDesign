import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Korisnici } from 'src/app/models/korisnici.model';
import { StayStudentService } from 'src/app/service/stay-student.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  blukId: string = "";
  korisnici: Korisnici[] = [];

  constructor(
    private service: StayStudentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.getUsersList(this.blukId).then(data => {
      this.korisnici = data;
    });
  }

    /*onSubmitModalClick(e){
    const initialState = {} as any;
    const savedEmmitter = new EventEmitter<any>();
    const subs = savedEmmitter.subscribe(() => {
      subs?.unsubscribe();
    });

    initialState.model = item;
    initialState.saved = savedEmmitter;
    
    const bsModalRef = this.modalService.show(TaxReportCheckComponent, { initialState, class: 'modal-dialog-centered modal-document' });
  }
  */
  removeKorisnik(row: any){
    var index = this.korisnici.findIndex(value=>{
      if(value && value.id == row.data.id){
        return true;
      }
      return false;
    });

    const data = this.korisnici[index];
    this.korisnici.splice(index,1);
  }

  addNewKorisnik(){
    var newKorisnik = new Korisnici();
    newKorisnik.id = this.korisnici.reduce((x, item) => x = x > item.id ? x : item.id+1, 0);
    this.korisnici.push(newKorisnik);
  }

}
