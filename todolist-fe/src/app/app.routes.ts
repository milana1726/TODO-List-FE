import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { TodoResolver } from './core/resolvers/todo.resolver';
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
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./todos/pages/item-info-page/todo-info-page.component').then(
            (c) => c.TodoInfoPageComponent
          ),
        resolve: { todo: TodoResolver },
      },
    ],
  },
  { path: '404', component: NotFoundPageComponent },
  { path: '**', redirectTo: '404' },
];
