import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';
import { interval } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() checkboxState = new EventEmitter<boolean>();
  checked=true;
  extension = true;
  connectedUsers = ['aaa', 'bbb', 'ccc', 'dddd'];
  currentUser: userDetail;
  constructor(private accountService: UserService) { }

  ngOnInit() {
   this.getUser();
  }
  getUser(){
    const interv = interval(100);
    
    interv.subscribe(n => {
    this.currentUser = this.accountService.getUser();
    } );
  }
  showExtension(val)
  {
    console.log(val);
    this.extension = val;
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
