import { StatusTaskEnum } from './enums/status-task.enum';

/** Modelo representa la informacion de tareas. */
export interface Task {
  /** Identificador de la tarea. */
  id: string;

  /** Nombre de la tarea. */
  name: string;

  /** Descripcion de la tarea. */
  description: string;

  /** Status tarea. */
  status: StatusTaskEnum;
}
