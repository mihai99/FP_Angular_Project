import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler';
import { listDetail } from '../interfaces/listInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) { }

  getLists()
  {
    return this.http.get('https://thelist-af99d.firebaseio.com/lists/allLists.json');
   
  }
  uploadList(list)
  {
    //list.items = list.items.toString();
    return  this.http.post('https://thelist-af99d.firebaseio.com/lists/allLists.json', list);
  }
  modifyList(list)
  {
    
   // list.items = list.items.toString();
    return  this.http.put('https://thelist-af99d.firebaseio.com/lists/allLists/'+list.id+'.json', list);
  }
 
}
