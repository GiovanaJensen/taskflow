export interface Tarefa {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  category_id: number;
  created_at: string | null;
  categories: {
    name: string;
    descripton?: string | null;
    color: string;
    icon: string;
  } | null;
}