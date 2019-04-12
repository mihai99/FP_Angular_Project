import { Component, OnInit, Input } from '@angular/core';

import { listDetail } from 'src/app/interfaces/listInterface';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';




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
allCategories = [];
newItem: '';
newCategory: '';
  constructor(private listService: ListsService ,
              private userService: UserService,
              private categoryService: CategoryService) { }

  ngOnInit() {
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
 uploadList()
  {
    let upList =  this.newList;
    upList.owner = this.userService.getUser().username;
    if(this.newList.category == "new")
     {   upList.category = this.newCategory;
        this.categoryService.postCategory(upList.category);
        this.getCategory();
     }
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

