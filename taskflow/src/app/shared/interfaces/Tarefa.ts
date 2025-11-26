export interface Tarefa {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  category_id: string;
  created_at: string | null;
  categories: {
    name: string;
    color: string;
    icon: string;
  } | null;
}