import { Injectable } from '@angular/core';
import { ArrayType } from '@angular/compiler';
import { listDetail } from '../interfaces/listInterface';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }
  getLists(): Array<listDetail>
  {
    return [
      {
     
        id:0,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptate molestias voluptatibus architecto blanditiis numquam cupiditate illo accusamus quia eum exercitationem possimus facere illum obcaecati perferendis, modi sunt amet beatae.',
        name: 'asd',
        category: 'food',
        items: ['aa', 'bb', 'cc'],
        likes: 125,
        owner: 'aa',
        dateAdded: new Date("03/20/2019")
    },
    {
     
      id:1,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptate molestias voluptatibus architecto blanditiis numquam cupiditate illo accusamus quia eum exercitationem possimus facere illum obcaecati perferendis, modi sunt amet beatae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptate molestias voluptatibus architecto blanditiis numquam cupiditate illo accusamus quia eum exercitationem possimus facere illum obcaecati perferendis, modi sunt amet beatae.',
      name: 'asd2',
      category: 'food',
      items: ['aa', 'bb', 'cc', 'dd'],
      likes: 23,
      owner: 'aa',
      dateAdded: new Date("01/20/2019")
  },
  {
     
    id:2,
    description: 'dasdasdasdad',
    name: 'asd2',
    category: 'food',
    items: ['aa', 'bb', 'cc', 'dd'],
    likes: 23,
    owner: 'aa',
    dateAdded: new Date("03/20/2019")
  },

  {
     
    id:3,
    description: 'pc1',
    name: 'asd2',
    category: 'pc',
    items: ['aa', 'bb', 'cc', 'dd'],
    likes: 23,
    owner: 'aa',
    dateAdded: new Date("01/20/2019")
  },
  {
     
    id:4,
    description: 'pc2',
    name: 'asd2',
    category: 'pc',
    items: ['aa', 'bb', 'cc', 'dd'],
    likes: 230,
    owner: 'aa',
    dateAdded: new Date("03/20/2019")
  }

    ];

  }
 
}
