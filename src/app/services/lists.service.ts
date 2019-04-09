import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler';
import { listDetail } from '../interfaces/listInterface';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
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

    return  this.http.post('https://fiipracticangular.firebaseio.com/lists/allLists.json', list);
  }
  likeList(list)
  {
 
    let user = this.userService.getUser();
   
    if(user.username != "")
    {
      this.getLikedListsIds(this.userService.getUser()).subscribe(data => {
        let allListsIds = Object.values(data);
       console.log("aa");
     
        allListsIds = allListsIds.filter(ids => ids.listId == list.id)
        
        if(allListsIds.length==0)
        {
          this.userService.addLikedList(this.userService.getUser(), list).subscribe();
          this.http.put('https://fiipracticangular.firebaseio.com/lists/allLists/'+list.id+'.json', list).subscribe();
        }
     })
       
    }
    else this.http.put('https://fiipracticangular.firebaseio.com/lists/allLists/'+list.id+'.json', list).subscribe(); 
  }
  regListId(idd)
  {
    let idPatch = {id: idd};
    console.log(idPatch);
    return this.http.patch('https://fiipracticangular.firebaseio.com/lists/allLists/' + idd+'.json', idPatch);
  }
  activateList(list)
  {
 
    let user = this.userService.getUser();
    this.getActiveListsIds(this.userService.getUser()).subscribe(data => {
    let allListsIds = Object.values(data);
     allListsIds = allListsIds.filter(ids => ids.listId == list.id)
     if(allListsIds.length==0)
          this.userService.addActiveList(this.userService.getUser(), list).subscribe();
         
        
     })
       
    
  }

  deleteActivateList(list) 
  {
 
   
    this.getActiveListsIds(this.userService.getUser()).subscribe(data => {
      let allActive = Object.values(data);
      let allKeys = Object.keys(data);
      for(let i=0;i<allActive.length;i++)
        if(allActive[i].listId == list.id)
        {
          this.userService.delActiveList(this.userService.getUser(), allKeys[i]).subscribe();
        }
       
     })
    
       
    
  }
  getCheckedItemsFromActiveList(id)
  {
    
    return this.http.get("https://fiipracticangular.firebaseio.com/lists/users/" + this.userService.getUser().id +  "/activeLists/" + id + "/listActiveObjects.json");
    
  }
  postItemCheckedInList(idList, noItem)
  {
    this.http.post("https://fiipracticangular.firebaseio.com/lists/users/" + this.userService.getUser().id +  "/activeLists/" + idList + "/listActiveObjects.json", {id: noItem}).subscribe();
  }
  deleteItemCheckedInList(idList, noItem)
  {
    this.getActiveListsIds(this.userService.getUser()).subscribe(data => 
      {
        let keys = Object.keys(data);
        let objs = Object.values(data);
        console.log(objs, idList, keys);
        for(let i=1;i<keys.length;i++)        
          if(keys[i] == idList) // keys[i]
          {
            
            this.getCheckedItemsFromActiveList(keys[i]).subscribe(data2 => {
             
              let vals = Object.values(data2);
              let keys2 = Object.keys(data2);
              console.log(noItem, vals);
              for(let j=0;j<vals.length;j++)
                  if(vals[j].id == noItem)  //keys[j]
                  {
                    console.log(" https://fiipracticangular.firebaseio.com/lists/users/"+ this.userService.getUser().id + "/activeLists/" + keys[i] + "/listActiveObjects/"+keys2[j]+".json");
                    this.http.delete(" https://fiipracticangular.firebaseio.com/lists/users/"+ this.userService.getUser().id + "/activeLists/" + keys[i] + "/listActiveObjects/"+keys2[j]+".json").subscribe();
                  }
                
            })
          }
            
      })
    
   
      }
  modifyList(list)
  {
  
    this.http.put('https://fiipracticangular.firebaseio.com/lists/allLists/'+list.id+'.json', list).subscribe();
  }
  getActiveListsIds(user:userDetail)
  {
    return this.http.get('https://fiipracticangular.firebaseio.com/lists/users/'+user.id+'/activeLists.json');
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
