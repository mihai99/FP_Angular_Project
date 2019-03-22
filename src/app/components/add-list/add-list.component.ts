import { Component, OnInit, Input } from '@angular/core';

import { listDetail } from 'src/app/interfaces/listInterface';


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})





export class AddListComponent implements OnInit {
  newList: listDetail = { 
    id:0,
    description: '',
    name: '',
    category: 'food',
    items: [],
    likes: 0,
    owner: '',
    dateAdded: new Date()
};
newItem: '';
  constructor() { }

  ngOnInit() {
  }

 
  addItem()
  {
   this.newList.items.push(this.newItem);
    this.newItem='';
  }
  delete(item)
  {
    this.newList.items = this.newList.items.filter(itemList => itemList !== item.innerHTML);
    console.log(this.newList);
  }
}
