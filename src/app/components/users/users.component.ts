import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() checkboxState = new EventEmitter<boolean>();
  checked=true;
  connectedUsers = ['aaa', 'bbb', 'ccc', 'dddd'];
  constructor() { }

  ngOnInit() {
   
  }
  change()
  {
    if(this.checked==true)
       this.checked=false;
      else
        this.checked=true;

      this.checkboxState.emit(this.checked);
  }
  
  
  
}
