import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Cambiar según backend

  constructor(private http: HttpClient) { }

  // Simulación de login con datos quemados
  login(username: string, password: string): Observable<any> {
    // Para prueba, aceptar cualquier usuario/contraseña
    // En producción, descomentar la línea del HTTP
    // return this.http.post(`${this.apiUrl}/login`, { username, password });
    
    // Simulación
    if (username && password) {
      return of({
        success: true,
        token: 'fake-jwt-token',
        user: {
          username: username,
          name: 'Usuario Demo'
        }
      }).pipe(delay(500));
    } else {
      return of({
        success: false,
        message: 'Credenciales inválidas'
      }).pipe(delay(500));
    }
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