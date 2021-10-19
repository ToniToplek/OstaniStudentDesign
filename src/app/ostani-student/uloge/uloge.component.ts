import { Component, EventEmitter, OnInit } from '@angular/core';
import { Uloge } from 'src/app/models/uloge.model';
import { StayStudentService } from 'src/app/service/stay-student.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-uloge',
  templateUrl: './uloge.component.html',
  styleUrls: ['./uloge.component.css']
})
export class UlogeComponent implements OnInit {

  blukId: string = "";
  uloge: Uloge[] = [];

  constructor(
    private service: StayStudentService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.getUlogeList(this.blukId).then(data => {
      this.uloge = data;
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
  }*/

}
