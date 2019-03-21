import { Component, OnInit, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})





export class AddListComponent implements OnInit {
  newList: any = { 
    id:0,
    description: '',
    name: '',
    category: 'food',
    items: [],
    likes: 0
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
