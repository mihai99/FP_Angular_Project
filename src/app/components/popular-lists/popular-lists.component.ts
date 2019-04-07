import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail, listDetailActive } from 'src/app/interfaces/listInterface';
import { UserService } from 'src/app/services/user.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { userDetail } from 'src/app/interfaces/user';
import { interval } from 'rxjs';

@Component({
  selector: 'app-popular-lists',
  templateUrl: './popular-lists.component.html',
  styleUrls: ['./popular-lists.component.scss']
})
export class PopularListsComponent implements OnInit {

  Lists:Array<listDetailActive>;
  listsUF: any = new Array<listDetailActive>();
  loggedInUser: userDetail;
  constructor(private listsService: ListsService,     
    private accountService: UserService) { }
  
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
    this.listsService.getLists().subscribe(data => {
      
      this.listsUF = Object.values(data);
      let keys = Object.keys(data);
      for(let i=0;i<this.listsUF.length;i++){
        this.listsUF[i].id = keys[i];
        this.listsUF[i].active = false;
        console.log(this.listsUF[i], "act: ", this.listsUF[i].active);
        this.listsService.getActiveListsIds(this.accountService.getUser()).subscribe(data=>
          {
            let allListsIds = Object.values(data);
            allListsIds = allListsIds.filter(l => l.listId == keys[i]);
            this.listsUF[i].active = (allListsIds.length>0);
            console.log(keys[i],allListsIds.length>0 );
          })
        this.listsUF[i].items = Object.values(this.listsUF[i].items);         
      }

      this.Lists = this.listsUF.filter(list => list.likes>10 ) ;    
      })
    }

    addLike(id)
    {
     
      let currentList = this.listsUF.filter(itemList => itemList.id == id); 
      for(let i = 0;i<this.listsUF.length;i++)
        if(this.listsUF[i].id==id && currentList[0].owner != this.loggedInUser.username)
        {
          this.listsUF[i].likes++;
          this.listsService.likeList(this.listsUF[i]);
        }

    }
    addDelActive(id)
    {
      if(this.loggedInUser.username!='')
      {
        let thisList;
        let index; 
        for(let i=0;i<this.Lists.length;i++)
        if(this.Lists[i].id==id)
             { 
               thisList = this.Lists[i];
                index = i;
             }

        if(thisList.active == false)
        {      
         
          this.Lists[index].active = true;
          this.listsService.activateList(thisList);
        }
        else
         {
            this.Lists[index].active = false;
            this.listsService.deleteActivateList(thisList);
         }    
      }
    }
}
