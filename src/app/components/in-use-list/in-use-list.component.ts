import { Component, OnInit, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';
import { userDetail } from 'src/app/interfaces/user';


@Component({
  selector: 'app-in-use-list',
  templateUrl: './in-use-list.component.html',
  styleUrls: ['./in-use-list.component.scss']
})
export class InUseListComponent implements OnInit {
  listId: any;
  allLists: any;
  currentList: listDetail = { visibility:  "",id: "",description: "",name: "",category:"", items: [], likes: 0,  owner: "",  dateAdded: new Date()  }
  loggedInUser: userDetail = {name: "", email: "", password: "",username: "",likedLists:[],activeLists: [],id: "",connected: false };
  checkedItems: Array<any>;
  iduAlaCareMoEnervat3ore: String;
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
    //
    
    //interv.subscribe(n => {
    this.loggedInUser = this.accountService.getUser();
   // } );
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
        this.getCheckedItems(this.currentList.id);
      })
  }
  getCheckedItems(id)
  {
    this.listService.getActiveListsIds(this.loggedInUser).subscribe(data => 
      {
        let keys = Object.keys(data);
        let objs = Object.values(data);
        console.log(objs);
        for(let i=1;i<keys.length;i++)
          if(objs[i].listId == id)
          {
            console.log("id: ", objs[i].listId);
            this.checkedItems = new Array<any>(objs[i].listObjectsCount).fill(false);
           
              console.log(this.checkedItems, "dsad", objs[i].listObjectsCount);
            this.iduAlaCareMoEnervat3ore = keys[i];
            this.listService.getCheckedItemsFromActiveList(keys[i]).subscribe(data2 => {
             
              let vals = Object.values(data2);
              for(let i=0;i<vals.length;i++)
                this.checkedItems[vals[i].id] = true;
                console.log(this.checkedItems);
            })
          }
            
      })
  }
  uploadChecked(no)
  {
   
      if(this.checkedItems[no] == false)
          this.listService.postItemCheckedInList(this.iduAlaCareMoEnervat3ore, no);
      else 
      {
        console.log("delete");
        this.listService.deleteItemCheckedInList(this.iduAlaCareMoEnervat3ore, no);

      }
     
    
  } 
  addLike(id)
    {
     
     
      for(let i = 0;i<this.allLists.length;i++)
        if(this.allLists[i].id==id && this.allLists[0].owner != this.loggedInUser.username)
        {
          this.allLists[i].likes++;
          this.listService.likeList(this.allLists[i]);
        }

     ;
    }

}
