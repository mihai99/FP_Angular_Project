import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';
import { listDetail } from 'src/app/interfaces/listInterface';
@Component({
  selector: 'app-liked-lists',
  templateUrl: './liked-lists.component.html',
  styleUrls: ['./liked-lists.component.scss']
})
export class LikedListsComponent implements OnInit {

  allCategories = ['food', 'pc', 'gift'];
  allLists = new Array<any>();
  exists = new Array<Boolean>();
  listsUF = new Array<any>();
  loggedInUser: userDetail;
  constructor(private listService: ListsService, 
              private accountService: UserService
              ) { }

  ngOnInit() {

    this.getUser(); 
    this.getLists();
 
  }
  getUser(){
    
    this.loggedInUser = this.accountService.getUser();
  
  }
  getLists(){
    
    this.listService.getLikedListsIds(this.accountService.getUser()).subscribe(data => {
 
      let allListsIds = Object.values(data);
      for(let i=0;i<this.allCategories.length;i++)
        this.allLists[this.allCategories[i]] = new Array<listDetail>();
      for(let i=0; i<allListsIds.length; i++)
          this.listService.getSingleList(allListsIds[i].listId).subscribe(data=> 
            {
              console.log("data: ", data['category']);
              this.allLists[data['category']].push(data);
              this.exists[data['category']] = true;
              
              console.log(this.allLists['food']);
            });
    
    })
  }
}
