import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { MockPopupService, MockTaskService } from 'src/mocks';
import { TaskHttpService } from '../../data-access/task-http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingComponent } from 'src/app/shared/ui/loading/loading.component';
import { TaskItemComponent } from '../../ui/task-item/task-item.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusTaskEnum, Task } from '../../utils/models';
import { of, throwError } from 'rxjs';
import { TaskResponse } from 'src/app/shared/models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskHttpService;
  let popupService: PopupService;
  const idTask = '526-987-852';
  const tasks: Task[] = [
    {
      id: idTask,
      name: 'task test',
      description: 'description task test',
      status: StatusTaskEnum.Finalizada,
    },
    {
      id: '123-456-123-654',
      name: 'task test2',
      description: 'description task test2',
      status: StatusTaskEnum.Pendiente,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        RouterTestingModule,
        LoadingComponent,
        BrowserAnimationsModule,
        TaskItemComponent,
        HttpClientModule,
      ],
      providers: [
        { provide: PopupService, useClass: MockPopupService },
        { provide: TaskHttpService, useClass: MockTaskService },
      ],
    });
    fixture = TestBed.createComponent(TaskListComponent);
    taskService = TestBed.inject(TaskHttpService);
    popupService = TestBed.inject(PopupService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('trackBy', () => {
    it('get trackBy', () => {
      component.tasks = tasks;
      expect(component.trackBy(1, tasks[0])).toBe(tasks[0].id);
    });
  });

  describe('removeTask', () => {
    it('should call removeTask', () => {
      const spyRemoveTask = spyOn(taskService, 'removeTask').and.callThrough();

      component.removeTask(tasks[0]);

      expect(spyRemoveTask).toHaveBeenCalled();
    });

    it('should call removeTask and call notify when is successful', () => {
      const taskResponse: TaskResponse = { message: 'ok' };
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'removeTask').and.returnValue(of(taskResponse));

      component.removeTask(tasks[0]);

      expect(spyNotify).toHaveBeenCalled();
    });

    it('should call removeTask and call notify when is unsuccessful', () => {
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'removeTask').and.returnValue(
        throwError(() => {
          throw { error: { message: 'error' } as TaskResponse };
        })
      );

      component.removeTask(tasks[0]);

      expect(spyNotify).toHaveBeenCalled();
    });
  });

  describe('getTasks', () => {
    it('should call getTasks', () => {
      const spyGetTasks = spyOn(taskService, 'getTasks').and.callThrough();

      component.ngOnInit();

      expect(spyGetTasks).toHaveBeenCalled();
    });

    it('should call getTasks and notify when return error', () => {
      const spyNotify = spyOn(popupService, 'notify').and.callThrough();
      spyOn(taskService, 'getTasks').and.returnValue(
        throwError(() => {
          throw new Error();
        })
      );

      component.ngOnInit();

      expect(spyNotify).toHaveBeenCalled();
    });
  });
});
