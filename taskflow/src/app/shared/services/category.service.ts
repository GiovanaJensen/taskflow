import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";
import { Categoria } from "../interfaces/Categoria";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    baseUrl = environment.apiUrl;
    private API_URL = `${this.baseUrl}/api/Category`;

    constructor(private http: HttpClient) {}
    
    getAll(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.API_URL);
    }

    createCategory(category: any): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.API_URL}/create`, category);
    }
}