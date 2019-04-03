import { Component, OnInit } from '@angular/core';
import { listDetail } from 'src/app/interfaces/listInterface';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';
import { interval } from 'rxjs';

@Component({
  selector: 'app-last-lists',
  templateUrl: './last-lists.component.html',
  styleUrls: ['./last-lists.component.scss']
})
export class LastListsComponent implements OnInit {

  Lists:Array<listDetail>;
  listsUF: any;
  loggedInUser: userDetail;
  constructor(private listsService: ListsService, 
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
 
    this.listsService.getLists().subscribe(data => {
      
      this.listsUF = Object.values(data);
      let keys = Object.keys(data);
      let thisDay = new Date();
      for(let i=0;i<this.listsUF.length;i++){
        this.listsUF[i].id = keys[i];
        this.listsUF[i].items =  Object.values(this.listsUF[i].items);
        this.listsUF[i].dateAdded = new Date(this.listsUF[i].dateAdded);
      }  
          
      this.Lists = this.listsUF.filter(list =>      
      Math.ceil( Math.abs(thisDay.getTime() - list.dateAdded.getTime()) / (1000 * 3600 * 24))<100);
     
      })
    }
 
    addLike(id)
    {
   
      let currentList = this.listsUF.filter(itemList => itemList.id == id); 
      if(currentList[0].owner != this.loggedInUser.username)
      { 
          currentList[0].likes++;
          console.log(currentList);
          this.listsService.modifyList(currentList[0], 1).subscribe(data => { this.getLists(); })
      }
    }
}
