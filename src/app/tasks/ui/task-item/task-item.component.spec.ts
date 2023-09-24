import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { MockPopupService } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusTaskEnum, Task } from '../../utils/models';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let popupService: PopupService;
  const task: Task = {
    id: '123123',
    name: 'test',
    description: 'description',
    status: StatusTaskEnum.Finalizada,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskItemComponent, RouterTestingModule],
      providers: [{ provide: PopupService, useClass: MockPopupService }],
    });
    fixture = TestBed.createComponent(TaskItemComponent);
    popupService = TestBed.inject(PopupService);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('confirmDeleteTask', () => {
    it('should call popupService confirm', () => {
      const spyConfirm = spyOn(popupService, 'confirm').and.callThrough();

      component.confirmDeleteTask({
        stopPropagation: () => {
          return;
        },
      } as Event);

      expect(spyConfirm).toHaveBeenCalled();
    });
  });

  describe('removeTask', () => {
    it('should emit event the method removeTask', async() => {
      const spyEvent = spyOn(
        component.refreshListTasks,
        'emit'
      ).and.callThrough();
      spyOn(popupService, 'confirm').and.callThrough();

      await component.confirmDeleteTask({
        stopPropagation: () => {
          return;
        },
      } as Event);

      expect(spyEvent).toHaveBeenCalled();
    });
  });
});
