import { Routes } from '@angular/router';

export const TASK_SHELL_ROUTING: Routes = [
  {
    path: '',
    title: 'Lista de Tareas',
    loadComponent: () =>
      import('src/app/tasks/feature/task-list/task-list.component').then(
        x => x.TaskListComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'new-task',
    title: 'Crea tu Nueva Tarea',
    loadComponent: () =>
      import('src/app/tasks/feature/task-detail/task-detail.component').then(
        x => x.TaskDetailComponent
      ),
  },
  {
    path: ':idTask',
    title: 'Detalle de Tarea',
    loadComponent: () =>
      import('src/app/tasks/feature/task-detail/task-detail.component').then(
        x => x.TaskDetailComponent
      ),
  },
];
