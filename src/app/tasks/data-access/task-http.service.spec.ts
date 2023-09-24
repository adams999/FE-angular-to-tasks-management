import { TestBed } from '@angular/core/testing';

import { TaskHttpService } from './task-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StatusTaskEnum, Task } from '../utils/models';
import { environment } from 'src/environments/environment';
import { TaskResponse } from 'src/app/shared/models';

const MICROSERVICE_PATH = '/tasks';

describe('TaskHttpService', () => {
  let service: TaskHttpService;
  let httpTestingController: HttpTestingController;
  const tasks: Task[] = [
    {
      id: '123-456-654',
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
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should return data to getTasks', () => {
      service.getTasks().subscribe(response => {
        expect(response).toEqual(tasks);
      });

      const router = `${environment.baseApiUrl}${MICROSERVICE_PATH}`;
      const req = httpTestingController.expectOne(router);
      expect(req.request.url).toBe(router);
      expect(req.request.method).toEqual('GET');
      req.flush(tasks);
      httpTestingController.verify();
    });
  });

  describe('getTaskSpecific', () => {
    it('should return data to getTaskSpecific', () => {
      service.getTaskSpecific(tasks[0].id).subscribe(response => {
        expect(response).toEqual(tasks[0]);
      });

      const router = `${environment.baseApiUrl}${MICROSERVICE_PATH}/${tasks[0].id}`;
      const req = httpTestingController.expectOne(router);
      expect(req.request.url).toBe(router);
      expect(req.request.method).toEqual('GET');
      req.flush(tasks[0]);
      httpTestingController.verify();
    });
  });

  describe('addNewTask', () => {
    it('should return data to addNewTask', () => {
      service.addNewTask(tasks[0]).subscribe(response => {
        expect(response).toEqual(tasks[0]);
      });

      const router = `${environment.baseApiUrl}${MICROSERVICE_PATH}`;
      const req = httpTestingController.expectOne(router);
      expect(req.request.url).toBe(router);
      expect(req.request.method).toEqual('POST');
      req.flush(tasks[0]);
      httpTestingController.verify();
    });
  });

  describe('editTask', () => {
    it('should return data to editTask', () => {
      service.editTask(tasks[0]).subscribe(response => {
        expect(response).toEqual(tasks[0]);
      });

      const router = `${environment.baseApiUrl}${MICROSERVICE_PATH}/${tasks[0].id}`;
      const req = httpTestingController.expectOne(router);
      expect(req.request.url).toBe(router);
      expect(req.request.method).toEqual('PUT');
      req.flush(tasks[0]);
      httpTestingController.verify();
    });
  });

  describe('removeTask', () => {
    it('should return data to removeTask', () => {
      const taskResponse: TaskResponse = { message: 'success' };
      service.removeTask(tasks[0].id).subscribe(response => {
        expect(response).toEqual(taskResponse);
      });

      const router = `${environment.baseApiUrl}${MICROSERVICE_PATH}/${tasks[0].id}`;
      const req = httpTestingController.expectOne(router);
      expect(req.request.url).toBe(router);
      expect(req.request.method).toEqual('DELETE');
      req.flush(taskResponse);
      httpTestingController.verify();
    });
  });
});
