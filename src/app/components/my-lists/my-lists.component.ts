import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail, listDetailActive } from 'src/app/interfaces/listInterface';
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
  listsUF: any = new Array<listDetailActive>();
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
      
      for(let i=0;i<this.listsUF.length;i++) {

        this.listsUF[i].id = keys[i];
        this.listsUF[i].active = false;

        
        this.listService.getActiveListsIds(this.accountService.getUser()).subscribe(dataa=>
          {
            let allListsIds = Object.values(dataa);
            allListsIds = allListsIds.filter(l => l.listId == keys[i]);
            this.listsUF[i].active = (allListsIds.length>0);
            //this.listsUF[i].active = (allListsIds.length>0);
            console.log(this.listsUF,"ins", allListsIds.length>0 );
          })
          
        this.listsUF[i].items = Object.values(this.listsUF[i].items);
      }
      //this.listsUF = this.listsUF.filter(item => item.owner == this.loggedInUser.username);
      for(let i=0;i<this.allCategories.length;i++) { 
       //   this.allLists[this.allCategories[i]] = new Array<listDetailActive>();
          this.allLists[this.allCategories[i]] = this.listsUF.filter(itemList => itemList.category == this.allCategories[i] && itemList.owner == this.loggedInUser.username);   
          this.exists[this.allCategories[i]] = this.allLists[this.allCategories[i]].length>0;       
      }  
    })
  }
  addDelActive(id)
  {
    if(this.loggedInUser.username!='')
    {
      let thisList;
      let index; 
      for(let i=0;i<this.listsUF.length;i++)
      if(this.listsUF[i].id==id)
           { 
              thisList = this.listsUF[i];
              index = i;
           }

      if(thisList.active == false)
      {      
       
        this.listsUF[index].active = true;
        this.listService.activateList(thisList);
      }
      else
       {
          this.listsUF[index].active = false;
          this.listService.deleteActivateList(thisList);
       }    
    }
  }
}
