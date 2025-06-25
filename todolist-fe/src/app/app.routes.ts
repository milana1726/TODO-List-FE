import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { TodoResolver } from './core/resolvers/todo.resolver';
import { TodoInfoPageComponent } from './todos/pages/item-info-page/todo-info-page.component';
import { TodoPageComponent } from './todos/pages/todo-page/todo-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos',
    component: TodoPageComponent,
  },
  {
    path: 'todos/:id',
    component: TodoInfoPageComponent,
    resolve: { todo: TodoResolver },
  },
  { path: '**', component: NotFoundPageComponent },
];
