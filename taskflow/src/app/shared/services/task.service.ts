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
    
    getAll(isCompleted: boolean): Observable<Tarefa[]> {
        return this.http.get<any[]>(`${this.API_URL}?isCompleted=${isCompleted}`).pipe(
            map(tasks => tasks.map(task => this.mapToTarefa(task)))
        );
    }

    getByCategory(categoryId: number, isCompleted: boolean): Observable<Tarefa[]> {
        return this.http.get<any[]>(`${this.API_URL}/Category/${categoryId}?isCompleted=${isCompleted}`).pipe(
            map(tasks => tasks.map(task => this.mapToTarefa(task)))
        );
    }

    deleteTask(id: number): Observable<string> {
        return this.http.delete(
            `${this.API_URL}/delete`,
            {
            params: { id },
            observe: 'response',
            responseType: 'text'
            }
        ).pipe(
            map(res => res.body as string)
        );
    }

    createTask(task: any): Observable<Tarefa> {
        return this.http.post<Tarefa>(`${this.API_URL}/create`, task);
    }

    finishTask(task: any): Observable<Tarefa> {
        return this.http.put<Tarefa>(`${this.API_URL}/complete`, task);
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