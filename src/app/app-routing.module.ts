import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  {
    path: '',
    component: KanbanComponent,
  },
  {
    path: 'crud',
    component: CrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
