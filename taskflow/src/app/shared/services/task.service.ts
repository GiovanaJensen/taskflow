import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environment";
import { Tarefa } from "../interfaces/Tarefa";

@Injectable({
    providedIn: 'root'
})

export class TaskService {

    baseUrl = environment.apiUrl;
    private API_URL = `${this.baseUrl}/api/Task`;

    constructor(private http: HttpClient) {}
    
    getAll(): Observable<Tarefa[]> {
        return this.http.get<any[]>(this.API_URL).pipe(
            map(tasks => tasks.map(task => this.mapToTarefa(task)))
        );
    }

    getByCategory(categoryId: number): Observable<Tarefa[]> {
        return this.http.get<any[]>(`${this.API_URL}/Category/${categoryId}`).pipe(
            map(tasks => tasks.map(task => this.mapToTarefa(task)))
        );
    }

    private mapToTarefa(task: any): Tarefa {
        return {
          id: String(task.id),
          title: task.title,
          description: task.description,
          completed: false,
          priority: this.mapPriority(task.priority),
          due_date: task.dueDate,
          category_id: task.categoryId,
          created_at: null,
          categories: null
        };
    }
    
    private mapPriority(priority: number): 'low' | 'medium' | 'high' {
        switch (priority) {
            case 1: return 'low';
            case 2: return 'medium';
            case 3: return 'high';
            default: return 'medium';
        }
    }
}