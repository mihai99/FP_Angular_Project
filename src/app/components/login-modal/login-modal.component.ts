import { Component, OnInit } from '@angular/core';
import { userDetail } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { isFulfilled } from 'q';
import { Router } from '@angular/router';

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
    activeLists: ['def'],
    connected: false,
    id: ''
  };
  passwd='';
  confpasswd='';
  logginUser='';
  logginPass='';
  constructor(private userService: UserService,
              private modal: MatDialog,
              private router: Router) { }

  ngOnInit() {

  }
  logIn()
  {
    if(this.logginPass != '' && this.logginUser != '')
    {
      this.userService.getAllUsers().subscribe(data =>{
         let users = Object.values(data);
         users = users.filter(user => user.username == this.logginUser && user.password == this.logginPass);
          if(users.length>0)
          {             
            this.userService.connectUser(users[0]).subscribe( data => {
                this.userService.setUser(users[0]);
                alert("you have logged in");
                this.router.navigate(['/mine']);
                this.modal.closeAll();
              })  
            
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
      console.log("subscribind");
       this.userService.registerUser(this.newUser).subscribe(data => {
         // console.log(Object.values(data)[0]);
          this.userService.regUserId(Object.values(data)[0]).subscribe();
          alert("you are registered");
          this.modal.closeAll();
         }, error => console.log(error));

    }
  }
}
