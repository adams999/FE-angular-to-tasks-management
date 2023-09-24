import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../utils/models';
import { TaskResponse } from 'src/app/shared/models';

const MICROSERVICE_PATH = '/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  constructor(private http: HttpClient) {}

  /**
   * Gets a list of Tasks.
   *
   * @returns A list of Tasks.
   */
  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${environment.baseApiUrl}${MICROSERVICE_PATH}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Get a Task.
   *
   * @param taskId TaskId of task.
   * @returns One Task.
   */
  getTaskSpecific(taskId: string): Observable<Task> {
    return this.http
      .get<Task>(`${environment.baseApiUrl}${MICROSERVICE_PATH}/${taskId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Add a new task.
   *
   * @param task new Task.
   * @returns A list of Tasks.
   */
  addNewTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${environment.baseApiUrl}${MICROSERVICE_PATH}`, task)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Edit Task specific.
   *
   * @param task Task to Edit.
   * @returns Edited task.
   */
  editTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(
        `${environment.baseApiUrl}${MICROSERVICE_PATH}/${task.id}`,
        task
      )
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Remove task.
   *
   * @param taskId TaskId to Edit.
   * @returns Removed Task.
   */
  removeTask(taskId: string): Observable<TaskResponse> {
    return this.http
      .delete<TaskResponse>(
        `${environment.baseApiUrl}${MICROSERVICE_PATH}/${taskId}`
      )
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
