import { Component, OnInit } from '@angular/core';
import { listDetail } from 'src/app/interfaces/listInterface';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-last-lists',
  templateUrl: './last-lists.component.html',
  styleUrls: ['./last-lists.component.scss']
})
export class LastListsComponent implements OnInit {

  Lists:Array<listDetail>;
 
  constructor(private lists: ListsService) { }

  ngOnInit() {
  this.getLists();
  }
  getLists(){
    const lists = this.lists.getLists();
    let thisDay = new Date();
    this.Lists = lists.filter(list =>      
      Math.ceil( Math.abs(thisDay.getTime() - list.dateAdded.getTime()) / (1000 * 3600 * 24))<10)


    
    console.log(this.Lists);
  }

}
