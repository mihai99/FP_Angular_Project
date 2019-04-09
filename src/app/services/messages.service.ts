import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { userDetail } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  sendMessage( to: userDetail, text: String)
  {
    let message = {
       sender: this.userService.loggedInUser.username,
       reciever: to.username, 
       mess: text
    }
    this.http.post("https://fiipracticangular.firebaseio.com/lists/users/"+to.id+"/messages.json", message).subscribe();
    this.http.post("https://fiipracticangular.firebaseio.com/lists/users/"+this.userService.loggedInUser.id+"/messages.json", message).subscribe();
  }
  getMessages(user:userDetail)
  {
    return this.http.get("https://fiipracticangular.firebaseio.com/lists/users/"+user.id+"/messages.json");
  }
}
