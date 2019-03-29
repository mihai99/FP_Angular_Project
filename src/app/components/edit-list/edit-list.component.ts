import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';



@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  listId: any;
  allLists: any;
  currentList: listDetail;
  newItem: String;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private listService: ListsService
              ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      console.log(params);
      this.listId = params.id;
      this.getCurrentList();
    })
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
        
      })
  }



  addItem()
  { 
    if(this.newItem) { 
      this.currentList.items.push(this.newItem);
      this.newItem='';
    }
  }
  delete(index)
  {
  
    this.currentList.items.splice(index, 1);
   
  }
  uploadList()
  {
    this.listService.modifyList(this.currentList).subscribe(data => {
      console.log(data); 
      alert("list modified");
      this.router.navigate(['viewFullList', this.currentList.id]);
  })
  }
}
