import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanComponent } from './kanban/kanban.component';
import { HeaderComponent } from './header/header.component';
import { CrudComponent } from './crud/crud.component';

@NgModule({
  declarations: [AppComponent, KanbanComponent, HeaderComponent, CrudComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
