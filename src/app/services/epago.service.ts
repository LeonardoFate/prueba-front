import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:3000/api/epago'; // Cambiar según backend
  private mockData: EpagoTransaction[] = [
    {
      id: 1,
      codigoEpago: '3164667',
      fechaSolicitud: '07/04/2023 23:57:38',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP001',
      valor: 3.00,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    },
    {
      id: 2,
      codigoEpago: '3164655',
      fechaSolicitud: '07/04/2023 23:26:40',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP002',
      valor: 7.13,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    },
    {
      id: 3,
      codigoEpago: '3164653',
      fechaSolicitud: '07/04/2023 23:20:18',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP003',
      valor: 7.13,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    },
    {
      id: 4,
      codigoEpago: '3164651',
      fechaSolicitud: '07/04/2023 23:19:29',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP004',
      valor: 7.13,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    },
    {
      id: 5,
      codigoEpago: '3164643',
      fechaSolicitud: '07/04/2023 22:51:49',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP005',
      valor: 4.75,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    },
    {
      id: 6,
      codigoEpago: '3164639',
      fechaSolicitud: '07/04/2023 22:46:28',
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: 'BP006',
      valor: 10.80,
      estaPagado: true,
      estaFacturado: true,
      valorFacturado: 0.00,
      valorPorFacturar: 0.00,
      valorAnulado: 0.00
    }
  ];

  constructor(private http: HttpClient) { }

  getTransactions(filters?: any): Observable<EpagoTransaction[]> {
    // En producción, usar HTTP:
    // const params = new HttpParams({ fromObject: filters });
    // return this.http.get<EpagoTransaction[]>(`${this.apiUrl}/transactions`, { params });

    // Simulación con filtros
    let filteredData = [...this.mockData];
    
    if (filters) {
      if (filters.codigoEpago) {
        filteredData = filteredData.filter(t => 
          t.codigoEpago.includes(filters.codigoEpago)
        );
      }
      if (filters.fechaDesde) {
        // Implementar filtro de fecha
      }
      if (filters.fechaHasta) {
        // Implementar filtro de fecha
      }
    }

    return of(filteredData).pipe(delay(300));
  }

  getTransactionById(id: number): Observable<EpagoTransaction> {
    // return this.http.get<EpagoTransaction>(`${this.apiUrl}/transactions/${id}`);
    const transaction = this.mockData.find(t => t.id === id);
    return of(transaction!).pipe(delay(200));
  }

  createTransaction(transaction: EpagoTransaction): Observable<EpagoTransaction> {
    // return this.http.post<EpagoTransaction>(`${this.apiUrl}/transactions`, transaction);
    const newTransaction = {
      ...transaction,
      id: this.mockData.length + 1
    };
    this.mockData.push(newTransaction);
    return of(newTransaction).pipe(delay(300));
  }

  updateTransaction(id: number, transaction: EpagoTransaction): Observable<EpagoTransaction> {
    // return this.http.put<EpagoTransaction>(`${this.apiUrl}/transactions/${id}`, transaction);
    const index = this.mockData.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...transaction, id };
      return of(this.mockData[index]).pipe(delay(300));
    }
    return of(transaction).pipe(delay(300));
  }

  deleteTransaction(id: number): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/transactions/${id}`);
    const index = this.mockData.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
    }
    return of({ success: true }).pipe(delay(300));
  }
}