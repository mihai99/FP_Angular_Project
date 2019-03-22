import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BodyComponent } from './components/body/body.component';
import { UsersComponent } from './components/users/users.component';
import { ListsComponent } from './components/lists/lists.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PopularListsComponent } from './components/popular-lists/popular-lists.component';
import { LastListsComponent } from './components/last-lists/last-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    UsersComponent,
    ListsComponent,
    AddListComponent,
    PopularListsComponent,
    LastListsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
