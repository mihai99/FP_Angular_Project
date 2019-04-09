import { Component, OnInit, Input,  Inject, ElementRef, Output, EventEmitter } from '@angular/core';
;
import { userDetail } from 'src/app/interfaces/user';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.scss']
})
export class MessagesModalComponent implements OnInit {
  text: String = "";
  messages: Array<any> = [];
  user;
  userWith;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();



  constructor(private messageService: MessagesService,
            private userService: UserService,
            private ref: ElementRef,           
            @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
   

    this.userWith = this.data.userWith;
    interval(500).subscribe(n =>
      {
       
      this.user = this.userService.getUser()
      this.getMessages()
      }
      );
  }
  send()
  {
    console.log(this.userWith.username);
    this.messageService.sendMessage(this.userWith, this.text);
    this.text = "";
  }
  getMessages()
  {
  
    this.messageService.getMessages(this.userService.getUser()).subscribe(data =>
      {
   
        this.messages = Object.values(data);
        this.messages = this.messages.filter(msg => (msg.reciever == this.user.username && msg.sender == this.userWith.username)|| (msg.sender == this.user.username && msg.reciever == this.userWith.username));
      })
  }
 }
  
  

