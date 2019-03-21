import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  showUsers=true;
  blockUser=true;
  constructor() { }

  ngOnInit() {
  }

  showUsr()
  {
    this.showUsers=true;
  }
  hideUsr()
  {
    if(this.blockUser==false)
    this.showUsers=false;
  }
  blockUserPannel(block: boolean) {
    this.blockUser=block;
    this.showUsers=true;
  }
}
