import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StatusTaskEnum, Task } from '../../utils/models';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskHttpService } from '../../data-access/task-http.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { LoadingComponent } from 'src/app/shared/ui/loading/loading.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    LoadingComponent,
  ],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  /** Observable for when the component is destroyed. */
  private destroyed$ = new Subject<void>();

  /** Formulario de la tarea. */
  taskForm!: FormGroup;

  /** Task to Form. */
  task: Task = {
    id: '',
    name: '',
    description: '',
    status: StatusTaskEnum.Pendiente,
  };

  /** Id task to edit. */
  idTask = '';

  /** Loading indicator to all component. */
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskHttpService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.taskForm = new FormGroup({
      nameTask: new FormControl('', Validators.required),
      descriptionTask: new FormControl('', Validators.required),
      statusTask: new FormControl(
        this.task.status === StatusTaskEnum.Finalizada ? true : false
      ),
    });
  }

  /**
   * Set values in form the tasks.
   */
  private setFormValues(): void {
    this.taskForm.controls['nameTask'].setValue(this.task.name);
    this.taskForm.controls['descriptionTask'].setValue(this.task.description);
    this.taskForm.controls['statusTask'].setValue(
      this.task.status === StatusTaskEnum.Finalizada ? true : false
    );
  }

  /** Life Cycle the component. */
  ngOnInit(): void {
    this.getParams();
  }

  /**
   * Attempts to retrieve the document info from the query params in the URL and make the requests.
   */
  private getParams(): void {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe({
      next: params => {
        if (params['idTask']) {
          this.idTask = params['idTask'];
          this.getTaskSpecific();
        }
      },
    });
  }

  /**
   * Get a Task.
   *
   * @returns One Task.
   */
  getTaskSpecific(): void {
    this.loading = true;
    this.taskService
      .getTaskSpecific(this.idTask)
      .pipe(first())
      .subscribe({
        next: task => {
          this.task = task;
          this.setFormValues();
          this.loading = false;
        },
        error: () => {
          this.popupService.notify(
            'No se encontro la tarea porfavor vuelve a intentarlo.',
            true
          );
          this.router.navigate(['/']);
          this.loading = false;
        },
      });
  }

  /**
   * Executed petition to save new user.
   */
  saveTask(): void {
    this.loading = true;
    this.task = {
      ...this.task,
      name: this.taskForm.controls['nameTask'].value,
      description: this.taskForm.controls['descriptionTask'].value,
      status: this.taskForm.controls['statusTask'].value
        ? StatusTaskEnum.Finalizada
        : StatusTaskEnum.Pendiente,
    };
    const petitionToSave$ = this.idTask
      ? this.taskService.editTask({ ...this.task, id: this.idTask })
      : this.taskService.addNewTask(this.task);

    petitionToSave$.pipe(first()).subscribe({
      next: () => {
        this.popupService.notify('Se guardaron los cambios exitosamente!');
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.popupService.notify(
          'Porfavor intente de nuevo no se pudo guardar los cambios!',
          true
        );
        this.loading = false;
      },
    });
  }

  /**
   * Show alert to confirm task and  execute petition to backend.
   *
   * @param Event Event the action to delete task.
   */
  async confirmDeleteTask(): Promise<void> {
    const response = await this.popupService.confirm({
      title: `Deseas remover la tarea ${this.task.name}?`,
      message: 'Este cambio sera permanente!',
      okButtonText: 'Si',
      cancelButtonText: 'No',
    });

    if (response) {
      this.removeTask();
    }
  }

  /**
   * Remove task.
   *
   * @returns Removed Task.
   */
  removeTask(): void {
    this.loading = true;
    this.taskService
      .removeTask(this.task.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.popupService.notify(
            `Se elimino correctamente la tarea ${this.task.name}`
          );
          this.router.navigate(['/']);
        },
        error: err => {
          this.loading = false;
          this.popupService.notify(err.error.message, true);
        },
      });
  }

  /**
   * Life cycle to destroy component and clean subscribes.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
