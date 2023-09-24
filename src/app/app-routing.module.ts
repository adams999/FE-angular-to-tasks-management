import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/feature/task-shell/task-shell-routing').then(
        x => x.TASK_SHELL_ROUTING
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tasks',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
