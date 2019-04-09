import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';
import { interval, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessagesModalComponent } from '../messages-modal/messages-modal.component';
import { MessagesService } from 'src/app/services/messages.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  convActive: Boolean = false;
  @Output() checkboxState = new EventEmitter<boolean>();
  checked=true;
  extension = true;
  usrWith: userDetail = {name: "",  email: "",  password: "",  username: "",  likedLists: ['def'],  activeLists: ['def'], connected: false, id: ''};;
  allUsers: Array<userDetail> = [];
  unseen : Array<Number> = [];
  currentUser: userDetail = {name: "",  email: "",  password: "",  username: "",  likedLists: ['def'],  activeLists: ['def'], connected: false, id: ''};
  constructor(private accountService: UserService,
            public dialog: MatDialog,
            private messageService: MessagesService) { }

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
    
    this.extension = val;
  }

  getLoggedInUsers()
  {
   
      this.accountService.getAllUsers().subscribe(data => 
        {
          this.allUsers = Object.values(data);
        
          if(this.currentUser.username != "")
          {
                this.allUsers = this.allUsers.filter(usr => usr.username != this.currentUser.username)
                 this.messageService.getMessages(this.currentUser).subscribe(dataa =>
                {             
                    let messages = Object.values(dataa);              
          
                    for(let i=0;i<this.allUsers.length;i++)                   
                      this.unseen[i] = messages.filter(msg =>  msg.sender == this.allUsers[i].username || msg.reciever == this.allUsers[i].username).length;
                  
                 
                  })
          }
         
         
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
  

  openDialog(user): void {
    if(this.accountService.loggedInUser.username!="")
    {
    const dialogRef = this.dialog.open(MessagesModalComponent, {
      panelClass: 'conversationModal',
      width: '60%',
      height: '60%',
      data: {userWith: user}
    });

  }
  }

  
  
  
}
