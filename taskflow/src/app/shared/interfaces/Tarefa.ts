export interface Tarefa {
  id: string;
  title: string;
  category_id: string | null;
  completed: boolean;
}