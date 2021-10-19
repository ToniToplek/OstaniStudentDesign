import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  status: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
  
  clickEvent(){
      this.status = !this.status;       
  }
}
