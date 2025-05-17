import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
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
  { path: '**', component: NotFoundPageComponent },
];
