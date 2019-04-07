import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDetail } from '../interfaces/user';
import { Observable, interval } from 'rxjs';
import { listDetail } from '../interfaces/listInterface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser:  userDetail = {username: '', name: '', email: '', password: '', likedLists: ['def'], activeLists: ['def'], connected: false, id: ''};
  constructor(private http: HttpClient, 
            private router: Router) { }

  setUser(user)
  {
    this.loggedInUser = user;
  }
  connectUser(user)
  {
    let idPatch = {connected: true};
    return this.http.patch('https://fiipracticangular.firebaseio.com/lists/users/' + user.id+'.json', idPatch);
  }
  disconnectUser(user)
  {
    let idPatch = {connected: false};
    
    return this.http.patch('https://fiipracticangular.firebaseio.com/lists/users/' + user.id+'.json', idPatch);
  }
  getUser(): any
  { 
    return this.loggedInUser;
  }
  addLikedList(user:userDetail, list:listDetail)
  {
      let postObj = {listId: list.id};
      return this.http.post('https://fiipracticangular.firebaseio.com/lists/users/' + user.id + '/likedLists.json', postObj);
  } 
  addActiveList(user:userDetail, list:listDetail)
  {
      let postObj = {listId: list.id, listObjectsCount: list.items.length, listActiveObjects: []};
      return this.http.post('https://fiipracticangular.firebaseio.com/lists/users/' + user.id + '/activeLists.json', postObj);
  } 
  delActiveList(user:userDetail, listid: string)
  {
    return this.http.delete("https://fiipracticangular.firebaseio.com/lists/users/"+user.id+"/activeLists/"+listid+".json");
  } 

  regUserId(idd)
  {
    let idPatch = {id: idd};
    console.log(idPatch);
    return this.http.patch('https://fiipracticangular.firebaseio.com/lists/users/' + idd+'.json', idPatch);
  }
  registerUser(user)
  {  
    return  this.http.post('https://fiipracticangular.firebaseio.com/lists/users.json', user);
  }
  
  getAllUsers()
  {
    //list.items = list.items.toString();
    return  this.http.get('https://fiipracticangular.firebaseio.com/lists/users.json');
  }
}
