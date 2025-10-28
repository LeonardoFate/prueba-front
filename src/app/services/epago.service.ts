import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface EpagoTransaction {
  id?: number;
  codigoEpago: string;
  fechaSolicitud: string;
  usuarioIngreso: string;
  botonPago: string;
  valor: number;
  estaPagado: boolean;
  estaFacturado: boolean;
  valorFacturado: number;
  valorPorFacturar: number;
  valorAnulado: number;
}

@Injectable({
  providedIn: 'root'
})
export class EpagoService {
  private apiUrl = `${environment.apiUrl}/epago`;  // ⭐ Usar environment

  constructor(private http: HttpClient) { }

  // ⭐ Obtener todas las transacciones
  getTransactions(filters?: any): Observable<EpagoTransaction[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.codigoEpago) {
        params = params.set('codigoEpago', filters.codigoEpago);
      }
      if (filters.fechaDesde) {
        params = params.set('fechaDesde', filters.fechaDesde);
      }
      if (filters.fechaHasta) {
        params = params.set('fechaHasta', filters.fechaHasta);
      }
    }
    
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.data || [])
    );
  }

  // ⭐ Obtener transacción por ID
  getTransactionById(id: number): Observable<EpagoTransaction> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  // ⭐ Crear transacción
  createTransaction(transaction: EpagoTransaction): Observable<EpagoTransaction> {
    return this.http.post<any>(this.apiUrl, transaction).pipe(
      map(response => response.data)
    );
  }

  // ⭐ Actualizar transacción
  updateTransaction(id: number, transaction: EpagoTransaction): Observable<EpagoTransaction> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transaction).pipe(
      map(response => response.data)
    );
  }

  // ⭐ Eliminar transacción
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}