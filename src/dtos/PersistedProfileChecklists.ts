import { TodoItem } from './TodoItem';

export interface PersistedProfileChecklists {
  name: string;
  items: TodoItem[];
}