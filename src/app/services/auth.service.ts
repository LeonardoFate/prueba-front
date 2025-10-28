import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // ⭐ Usar environment

  constructor(private http: HttpClient) { }

  // ⭐ Actualizar método login para usar backend real
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { 
      username, 
      password 
    }).pipe(
      map((response: any) => {
        // El backend retorna { success, message, data: { token, user } }
        if (response.success && response.data) {
          return {
            success: true,
            token: response.data.token,
            user: response.data.user,
            message: response.message
          };
        }
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}