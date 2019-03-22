import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { PopularListsComponent } from './components/popular-lists/popular-lists.component';
import { LastListsComponent } from './components/last-lists/last-lists.component';

const routes: Routes = [
{path: '', component: ListsComponent},
{path: 'add', component: AddListComponent},
{path: 'popular', component: PopularListsComponent},
{path: 'latest', component: LastListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
