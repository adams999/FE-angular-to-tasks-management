import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { MockPopupService, MockTaskService } from 'src/mocks';
import { TaskHttpService } from '../../data-access/task-http.service';
import { LoadingComponent } from 'src/app/shared/ui/loading/loading.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StatusTaskEnum, Task } from '../../utils/models';
import { TaskResponse } from 'src/app/shared/models';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskService: TaskHttpService;
  let popupService: PopupService;
  let router: Router;
  const idTask = '526-987-852';
  const task: Task = {
    id: idTask,
    name: 'test',
    description: 'descr test',
    status: StatusTaskEnum.Pendiente,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TaskDetailComponent,
        RouterTestingModule,
        LoadingComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PopupService, useClass: MockPopupService },
        { provide: TaskHttpService, useClass: MockTaskService },
      ],
    });
    fixture = TestBed.createComponent(TaskDetailComponent);
    taskService = TestBed.inject(TaskHttpService);
    popupService = TestBed.inject(PopupService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('saveTask', () => {
    it('should call editTask', () => {
      component.idTask = idTask;
      const spySaveTask = spyOn(taskService, 'editTask').and.callThrough();

      component.saveTask();

      expect(spySaveTask).toHaveBeenCalled();
    });

    it('should call addNewTask', () => {
      const spySaveTask = spyOn(taskService, 'addNewTask').and.callThrough();

      component.saveTask();

      expect(spySaveTask).toHaveBeenCalled();
    });

    it('should call editTask and throw error', () => {
      component.idTask = idTask;
      const spyError = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'editTask').and.returnValue(
        throwError(() => {
          throw new Error();
        })
      );

      component.saveTask();

      expect(spyError).toHaveBeenCalledWith(
        'Porfavor intente de nuevo no se pudo guardar los cambios!',
        true
      );
    });

    it('should call addNewTask and throw error', () => {
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'addNewTask').and.returnValue(
        throwError(() => {
          throw new Error();
        })
      );

      component.saveTask();

      expect(spyNotify).toHaveBeenCalledWith(
        'Porfavor intente de nuevo no se pudo guardar los cambios!',
        true
      );
    });

    it('should call notify when method saveTask is successful', () => {
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'addNewTask').and.returnValue(of(task));

      component.saveTask();

      expect(spyNotify).toHaveBeenCalled();
    });

    it('should call navigate when method saveTask is successful', () => {
      const spyNotify = spyOn(router, 'navigate').and.callThrough();
      spyOn(taskService, 'addNewTask').and.returnValue(of(task));

      component.saveTask();

      expect(spyNotify).toHaveBeenCalled();
    });
  });

  describe('setFormValues', () => {
    it('should set values in the form', () => {
      component.task = task;
      component['setFormValues']();
      expect(component.taskForm.controls['nameTask'].value).toBe(task.name);
      expect(component.taskForm.controls['descriptionTask'].value).toBe(
        task.description
      );
      expect(component.taskForm.controls['statusTask'].value).toBeFalse();
    });
  });

  describe('getTaskSpecific', () => {
    it('should call getTaskSpecific', () => {
      const spyGetTask = spyOn(
        taskService,
        'getTaskSpecific'
      ).and.callThrough();

      component.getTaskSpecific();

      expect(spyGetTask).toHaveBeenCalled();
    });

    it('should call getTaskSpecific and call setFormValues', () => {
      spyOn(taskService, 'getTaskSpecific').and.returnValue(of(task));

      component.getTaskSpecific();

      expect(component.taskForm.controls['nameTask'].value).toBe(task.name);
    });

    it('should call getTaskSpecific and return error', () => {
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'getTaskSpecific').and.returnValue(
        throwError(() => {
          throw new Error();
        })
      );

      component.getTaskSpecific();

      expect(spyNotify).toHaveBeenCalled();
    });
  });

  describe('removeTask', () => {
    it('should call removeTask', () => {
      const spyRemoveTask = spyOn(taskService, 'removeTask').and.callThrough();

      component.removeTask();

      expect(spyRemoveTask).toHaveBeenCalled();
    });

    it('should call removeTask and call notify when is successful', () => {
      const taskResponse: TaskResponse = { message: 'ok' };
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'removeTask').and.returnValue(of(taskResponse));

      component.removeTask();

      expect(spyNotify).toHaveBeenCalled();
    });

    it('should call removeTask and call notify when is unsuccessful', () => {
      component.task = task;
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'removeTask').and.returnValue(
        throwError(() => {
          throw { error: { message: 'error' } as TaskResponse };
        })
      );

      component.removeTask();

      expect(spyNotify).toHaveBeenCalled();
    });
  });

  describe('confirmDeleteTask', () => {
    it('should call popupService confirm', () => {
      const spyConfirm = spyOn(popupService, 'confirm').and.callThrough();

      component.confirmDeleteTask();

      expect(spyConfirm).toHaveBeenCalled();
    });
  });
});
