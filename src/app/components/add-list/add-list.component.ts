import { Component, OnInit, Input } from '@angular/core';

import { listDetail } from 'src/app/interfaces/listInterface';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})





export class AddListComponent implements OnInit {
  newList: listDetail = { 
    id: '',
    description: '',
    name: '',
    category: 'food',
    items: [],
    likes: 0,
    owner: '',
    visibility: '',
    dateAdded: new Date()
};
newItem: '';

  constructor(private listService: ListsService ,
              private userService: UserService             
    ) { }

  ngOnInit() {
  }

 
 uploadList()
  {
    let upList =  this.newList;
    upList.owner = this.userService.getUser().username;
    this.listService.uploadList(upList).subscribe(data => {
      if(data){
        alert("lista adaugata cu succes")
        console.log(data);
        this.listService.regListId(Object.values(data)[0]).subscribe();
        this.newList = {id: '',description: '',name: '',category: 'food',items: [],likes: 0,owner: this.userService.getUser().username, visibility: '', dateAdded: new Date()}
      }
    });
    return 1;
  }
 
  addItem()
  { 
    if(this.newItem) { 
      this.newList.items.push(this.newItem);
      this.newItem='';
    }
  }

  delete(index)
  {
  
    this.newList.items.splice(index, 1);
   
  }
}

