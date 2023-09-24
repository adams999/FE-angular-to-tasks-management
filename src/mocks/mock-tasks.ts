import { Injectable } from '@angular/core';
import { Observable, delay, of, shareReplay } from 'rxjs';
import { TaskResponse } from 'src/app/shared/models';
import { StatusTaskEnum, Task } from 'src/app/tasks/utils/models';

/**
 * Mock to task http service.
 */
@Injectable({
  providedIn: 'root',
})
export class MockTaskService {
  /**
   * Gets a list of Tasks.
   *
   * @returns A list of Tasks.
   */
  getTasks(): Observable<Task[]> {
    const tasksData: Task[] = [
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
    return of(tasksData).pipe(
      delay(1000),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Get a Task.
   *
   * @param taskId TaskId of task.
   * @returns One Task.
   */
  getTaskSpecific(taskId: string): Observable<Task> {
    const taskData: Task = {
      id: '123-456-654',
      name: 'task test',
      description: 'description task test',
      status: StatusTaskEnum.Finalizada,
    };
    return of(taskData).pipe(
      delay(1000),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Add a new task.
   *
   * @param task new Task.
   * @returns A list of Tasks.
   */
  addNewTask(task: Task): Observable<Task> {
    const taskData: Task = {
      id: '123-456-654',
      name: 'task test',
      description: 'description task test',
      status: StatusTaskEnum.Finalizada,
    };
    return of(taskData).pipe(
      delay(1000),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Edit Task specific.
   *
   * @param task Task to Edit.
   * @returns Edited task.
   */
  editTask(task: Task): Observable<Task> {
    const taskData: Task = {
      id: '123-456-654',
      name: 'task test',
      description: 'description task test',
      status: StatusTaskEnum.Finalizada,
    };
    return of(taskData).pipe(
      delay(1000),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Remove task.
   *
   * @param taskId TaskId to Edit.
   * @returns Removed Task.
   */
  removeTask(taskId: string): Observable<TaskResponse> {
    const taskResponse: TaskResponse = {
      message: 'exitoso',
      task: [
        {
          id: '123-456-6524',
          name: 'task test',
          description: 'description task test',
          status: StatusTaskEnum.Finalizada,
        },
      ],
    };
    return of(taskResponse).pipe(
      delay(1000),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
