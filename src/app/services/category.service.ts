import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  postCategory(category)
  {
    let obj = {name: category};
    this.http.post("https://fiipracticangular.firebaseio.com/lists/categories.json" , obj).subscribe();
  }
  getCategory()
  {
    return this.http.get("https://fiipracticangular.firebaseio.com/lists/categories.json");
  }
}
