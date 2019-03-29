import { Component, OnInit } from '@angular/core';
import { userDetail } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { isFulfilled } from 'q';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  active = 'l';
  newUser:userDetail = {
    name: "",
    email: "",
    password: "",
    username: "",
    likedLists: ['def'],
    activeLists: ['def']
  };
  passwd='';
  confpasswd='';
  logginUser='';
  logginPass='';
  constructor(private userService: UserService,
              private modal: MatDialog) { }

  ngOnInit() {

  }
  log()
  {
    if(this.logginPass != '' && this.logginUser != '')
    {
      this.userService.getUsers().subscribe(data =>{
        let users = Object.values(data);
        users = users.filter(user => user.username == this.logginUser && user.password == this.logginPass);
        if(users.length>0)
        { 
             
              this.userService.setUser(users[0]);
              this.modal.closeAll();
        }
        else
        alert("something went wrong");
      });
    }
     
  }
  reg()
  {
    let ok=1;
    if(this.newUser.name == "" || this.newUser.email == "" || this.newUser.username == "")
    {
        alert("please complete all fields");
        ok=0;
    }
    if(ok==1 && (this.passwd != this.confpasswd || this.passwd == ""))
    {
        alert("password doen't match");
        ok=0;
    }
    if(ok)
    {
      this.newUser.password = this.passwd;
     
      this.userService.registerUser(this.newUser).subscribe(data => {
          console.log(data);
          alert("you are registered");
          this.modal.closeAll();
        });

    }
  }
}
