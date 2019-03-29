import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userDetail } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   loggedInUser:  userDetail = {username: '', name: '', email: '', password: '', likedLists: ['def'], activeLists: ['def'] };
  constructor(private http: HttpClient) { }
  
  setUser(user: userDetail)
  {
    this.loggedInUser = user;
    console.log(this.loggedInUser);
  }
  
  getUser(): any
  {
    return this.loggedInUser;
  }
  registerUser(user)
  {
    //list.items = list.items.toString();
    return  this.http.post('https://thelist-af99d.firebaseio.com/lists/users.json', user);
  }
  getUsers()
  {
    //list.items = list.items.toString();
    return  this.http.get('https://thelist-af99d.firebaseio.com/lists/users.json');
  }
}
