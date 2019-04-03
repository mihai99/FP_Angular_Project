import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler';
import { listDetail } from '../interfaces/listInterface';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UsersComponent } from '../components/users/users.component';
import { userDetail } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient,
            private userService: UserService) { }

  getLists()
  {
    return this.http.get('https://fiipracticangular.firebaseio.com/lists/allLists.json');
   
  }
  uploadList(list)
  {
    //list.items = list.items.toString();
    return  this.http.post('https://fiipracticangular.firebaseio.com/lists/allLists.json', list);
  }
  likeList(list)
  {
 
    let user = this.userService.getUser();
   
    if(user.username != "")
    {
      this.getLikedListsIds(this.userService.getUser()).subscribe(data => {
        let allListsIds = Object.values(data);
       
     
        allListsIds = allListsIds.filter(ids => ids.listId == list.id)
        
        if(allListsIds.length==0)
        {
          this.userService.addLikedList(this.userService.getUser(), list).subscribe();
          this.http.put('https://fiipracticangular.firebaseio.com/lists/allLists/'+list.id+'.json', list).subscribe();
        }
     })
       
    }
  }
  modifyList(list, onlyLike)
  {
    if(onlyLike==true) this.likeList(list);
    return  this.http.put('https://fiipracticangular.firebaseio.com/lists/allLists/'+list.id+'.json', list);
  }
  getLikedListsIds(user:userDetail)
  {
    return this.http.get('https://fiipracticangular.firebaseio.com/lists/users/'+user.id+'/likedLists.json');
  }
  getSingleList(listId:String)
  {
    return this.http.get('https://fiipracticangular.firebaseio.com/lists/allLists/'+listId + '.json');
  }
}
