import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { PopularListsComponent } from './components/popular-lists/popular-lists.component';
import { LastListsComponent } from './components/last-lists/last-lists.component';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';

import { LoggedInGuardGuard } from './guards/logged-in-guard.guard';
import { ActiveListsComponent } from './components/active-lists/active-lists.component';
import { InUseListComponent } from './components/in-use-list/in-use-list.component';

const routes: Routes = [
{path: '', component: ListsComponent},
{path: 'add', component: AddListComponent, canActivate: [LoggedInGuardGuard]},
{path: 'popular', component: PopularListsComponent},
{path: 'latest', component: LastListsComponent},
{path: 'mine', component: MyListsComponent, canActivate: [LoggedInGuardGuard]},
{path: 'viewFullList/:id', component: ViewListComponent},
{path: 'editList/:id', component: EditListComponent, canActivate: [LoggedInGuardGuard]},
{path: 'isUse/:id', component: InUseListComponent, canActivate: [LoggedInGuardGuard]},
{path: 'active', component: ActiveListsComponent, canActivate: [LoggedInGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
