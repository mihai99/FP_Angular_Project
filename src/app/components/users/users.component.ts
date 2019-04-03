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
  connectedUsers: Array<userDetail> = [];
  currentUser: userDetail = {name: "",  email: "",  password: "",  username: "",  likedLists: ['def'],  activeLists: ['def'], connected: false, id: ''};
  constructor(private accountService: UserService) { }

  ngOnInit() {
   this.getUser();
  }
  getUser(){
    interval(1000).subscribe(n => {
    this.currentUser = this.accountService.getUser();
    this.getLoggedInUsers();
    } );
  }
  showExtension(val)
  {
    console.log(val);
    this.extension = val;
  }

  getLoggedInUsers()
  {
      this.accountService.getAllUsers().subscribe(data => 
        {
          this.connectedUsers = Object.values(data);
          this.connectedUsers = this.connectedUsers.filter(usr => (usr.connected == true && this.currentUser.username != usr.username));
        })
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
