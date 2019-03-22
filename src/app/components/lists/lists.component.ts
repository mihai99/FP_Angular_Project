import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { TouchSequence } from 'selenium-webdriver';
import { listDetail } from 'src/app/interfaces/listInterface';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  foodLists:Array<listDetail>;
  pcLists:Array<listDetail>;
  constructor(private lists: ListsService) { }

  ngOnInit() {
  this.getLists();
  }
  getLists(){
    const lists = this.lists.getLists();
    this.foodLists = lists.filter(itemList => itemList.category == 'food');
    this.pcLists = lists.filter(itemList => itemList.category == 'pc');
  
    
    
  }
}
