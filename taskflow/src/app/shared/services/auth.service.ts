import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = environment.apiUrl;
    private AUTH_URL = `${this.baseUrl}/api/auth`;

    constructor(private http: HttpClient) {}
    
    register(data: {fullName: string; email: string; password: string}): Observable<any> {
        return this.http.post(`${this.AUTH_URL}/register`, data);
    }

    login(data: {email: string; password: string}): Observable<any> {
        return this.http.post(`${this.AUTH_URL}/login`, data);
    }
}