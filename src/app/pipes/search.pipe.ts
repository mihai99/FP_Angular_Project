import { Pipe, PipeTransform } from '@angular/core';
import { listDetailActive } from '../interfaces/listInterface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<listDetailActive>, text: any): any {
    console.log(text);
    if(text == "") return value;
    let valueReturn = value.filter(val => val.name.includes(text) || val.category.includes(text));
    return valueReturn;
  }

}
