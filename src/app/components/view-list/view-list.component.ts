import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';
import { userDetail } from 'src/app/interfaces/user';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
  listId: any;
  allLists: any;
  currentList: listDetail;
  loggedInUser: userDetail;
  constructor(private route: ActivatedRoute,
              private listService: ListsService,
              private accountService:  UserService ) { }

  ngOnInit() {
    this.getUser();
    this.route.params.subscribe(params => {
      console.log(params);
      this.listId = params.id;
      this.getCurrentList();
    })
  }
  getUser(){
    const interv = interval(100);
    
    interv.subscribe(n => {
    this.loggedInUser = this.accountService.getUser();
    } );
  }
  getCurrentList()
  {
    this.listService.getLists().subscribe(data =>
      {
        this.allLists = Object.values(data);
        let keys = Object.keys(data);
        for(let i=0;i<this.allLists.length;i++){
            this.allLists[i].id = keys[i];
            this.allLists[i].items = Object.values(this.allLists[i].items);         
        }
        this.currentList = this.allLists.filter(list => list.id == this.listId)[0];
        console.log("aa", this.currentList);
      })
  }

  addLike(id)
    {
     
      let currentList = this.allLists.filter(itemList => itemList.id == id); 
      if(currentList[0].owner != this.loggedInUser.username)
      { 
          currentList[0].likes++;
          console.log(currentList);
          this.listService.modifyList(currentList[0]).subscribe(data => { this.ngOnInit(); })
      }
  
     ;
    }

}
