import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';
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

  Lists:Array<listDetail>;
  listsUF: any;
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
        this.listsUF[i].items = Object.values(this.listsUF[i].items);         
      }

      this.Lists = this.listsUF.filter(list => list.likes>10 ) ;    
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
  
     ;
    }
}
