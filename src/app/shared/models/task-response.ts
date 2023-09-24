import { Task } from 'src/app/tasks/utils/models';

/** Modelo representa la estandarizacion de data para las peticiones de rutas de tasks. */
export interface TaskResponse {
  /** Mensaje mostrar al cliente. */
  message: string;

  /** Data de la tarea actualizada. */
  task?: Task[];
}
