import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { listDetail } from 'src/app/interfaces/listInterface';

@Component({
  selector: 'app-popular-lists',
  templateUrl: './popular-lists.component.html',
  styleUrls: ['./popular-lists.component.scss']
})
export class PopularListsComponent implements OnInit {

  Lists:Array<listDetail>;
 
  constructor(private lists: ListsService) { }

  ngOnInit() {
  this.getLists();
  }
  getLists(){
    const lists = this.lists.getLists();
    this.Lists = lists.filter(list => list.likes>100);
   
    
    console.log(lists);
  }

}
