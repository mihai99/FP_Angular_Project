import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from 'src/app/services/user.service';
import { userDetail } from 'src/app/interfaces/user';
import { listDetail } from 'src/app/interfaces/listInterface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-active-lists',
  templateUrl: './active-lists.component.html',
  styleUrls: ['./active-lists.component.scss']
})
export class ActiveListsComponent implements OnInit {
  ser: String = "";
  allCategories = ['food', 'pc', 'gift'];
  allLists = new Array<any>();
  exists = new Array<Boolean>();

  loggedInUser: userDetail;
  constructor(private listService: ListsService, 
              private accountService: UserService,
              private categoryService:CategoryService
              ) { }

  ngOnInit() {

    this.getUser(); 
    this.getLists();
    this.getCategory();
  }
  getCategory()
  {
     this.categoryService.getCategory().subscribe(data =>
       {
         let cat = Object.values(data);
         for(let i=0;i<cat.length;i++)
           this.allCategories[i] = cat[i].name;
         console.log(this.allCategories);
       })
  }
  getUser(){
    
    this.loggedInUser = this.accountService.getUser();
  
  }  
 delActive(list)
  {
    
   
        console.log(list);
      
       
       this.listService.getActiveListsIds(this.loggedInUser).subscribe(data => {
        let allActive = Object.values(data);
        let allKeys = Object.keys(data);
        for(let i=0;i<allActive.length;i++)
          if(allActive[i].listId == list.id)
          {
            this.accountService.delActiveList(this.loggedInUser, allKeys[i]).subscribe(data => {
              this.getLists();
            });
          }
         
       })
    
  }
  getLists(){
    
    this.listService.getActiveListsIds(this.accountService.getUser()).subscribe(data => {
 
      let allListsIds = Object.values(data);


      for(let i=0;i<this.allCategories.length;i++)
        this.allLists[this.allCategories[i]] = new Array<any>();

      for(let i=0; i<allListsIds.length; i++)
          this.listService.getSingleList(allListsIds[i].listId).subscribe(data2=> 
            {
              let item: any = data2;
             
              item.progres =  (Object.values(allListsIds[i].listActiveObjects).length-1)*100/allListsIds[i].listObjectsCount;
        
              this.allLists[item['category']].push(item);
              
              this.exists[item['category']] = true;
              
             
            });
    
    })
  }
  
}
