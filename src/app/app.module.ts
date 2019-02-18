import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { HrComponent } from './hr/hr.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    HrComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
