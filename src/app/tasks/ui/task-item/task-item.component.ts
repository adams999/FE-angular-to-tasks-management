import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../utils/models';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StatusTaskEnum } from '../../utils/models/enums';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  /** Task to show. */
  @Input({ required: true }) task!: Task;

  /** Event to refresh data of parent. */
  @Output() refreshListTasks = new EventEmitter<Task>();

  /** Enum to compare status the task. */
  enumStatusTask = StatusTaskEnum;

  constructor(private popupService: PopupService) {}

  /**
   * Show alert to confirm task and  execute petition to backend.
   *
   * @param Event Event the action to delete task.
   */
  async confirmDeleteTask(event: Event): Promise<void> {
    event.stopPropagation();

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
    this.refreshListTasks.emit(this.task);
  }
}
