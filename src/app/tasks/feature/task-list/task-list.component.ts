import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../../ui/task-item/task-item.component';
import { Task } from '../../utils/models';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TaskHttpService } from '../../data-access/task-http.service';
import { first } from 'rxjs';
import { PopupService } from 'src/app/shared/services/popup.service';
import { LoadingComponent } from 'src/app/shared/ui/loading/loading.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskItemComponent,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    LoadingComponent,
  ],
  providers: [TaskHttpService],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  /** Titulo de componente. */
  title = 'Lista de tareas pendientes';

  /** Variable que contiene las tareas. */
  tasks: Task[] = [];

  /** Loading to show while respond backend. */
  loading = false;

  constructor(
    private taskService: TaskHttpService,
    private popupService: PopupService
  ) {}

  /**
   * Life cycle init the component.
   */
  ngOnInit(): void {
    this.getTasks();
  }

  /**
   * Gets a list of Tasks.
   *
   * @returns A list of Tasks.
   */
  private getTasks(): void {
    this.tasks = [];
    this.loading = true;
    this.taskService
      .getTasks()
      .pipe(first())
      .subscribe({
        next: tasks => {
          this.tasks = tasks;
          this.loading = false;
        },
        error: () => {
          this.popupService.notify(
            'Intente de nuevo, no pudimos listar las tareas',
            true
          );
          this.loading = false;
        },
      });
  }

  /**
   * TrackBy in *ngFor, to tasks.
   *
   * @param index Number of index *ngFor.
   * @param item Task.
   * @returns Id of the task.
   */
  trackBy(index: number, task: Task): string {
    return task.id;
  }

  /**
   * Remove task.
   *
   * @param task Task to removed.
   * @returns Removed Task.
   */
  removeTask(task: Task): void {
    this.loading = true;
    this.taskService
      .removeTask(task.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.popupService.notify(
            `Se elimino correctamente la tarea ${task.name}`
          );
          this.getTasks();
        },
        error: err => {
          this.loading = false;
          this.popupService.notify(err.error.message, true);
        },
      });
  }
}
