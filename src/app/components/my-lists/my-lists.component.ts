import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';
import { UserService } from 'src/app/services/user.service';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { userDetail } from 'src/app/interfaces/user';
import { interval } from 'rxjs';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {

  allCategories = ['food', 'pc', 'gift'];
  allLists = new Array<String>();
  exists = new Array<Boolean>();
  listsUF: any;
  loggedInUser: userDetail;
  constructor(private listService: ListsService, 
              private accountService: UserService
              ) { }

  ngOnInit() {
  this.getLists();
  this.getUser(); 
  }
  getUser(){
    const interv = interval(100);
    
    interv.subscribe(n => {
    this.loggedInUser = this.accountService.getUser();
    } );
  }
  getLists(){
    this.listService.getLists().subscribe(data => {

      
      this.listsUF = Object.values(data);
      let keys = Object.keys(data);
      console.log(keys);
      for(let i=0;i<this.listsUF.length;i++) {
        this.listsUF[i].id = keys[i];
        this.listsUF[i].items = Object.values(this.listsUF[i].items);
    }
      this.listsUF = this.listsUF.filter(item => item.owner == this.loggedInUser.username);
      for(let i=0;i<this.allCategories.length;i++) { 
          this.allLists[this.allCategories[i]] = new Array<listDetail>();
          this.allLists[this.allCategories[i]] = this.listsUF.filter(itemList => itemList.category == this.allCategories[i]);   
          this.exists[this.allCategories[i]] = this.allLists[this.allCategories[i]].length>0;       
      }  
    })
  }
  
}
