import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EpagoService, EpagoTransaction } from '../../../services/epago.service';

declare var $: any;
declare var flatpickr: any;

@Component({
  selector: 'app-transacciones-epago',
  templateUrl: './transacciones-epago.component.html',
  styleUrls: ['./transacciones-epago.component.css']
})
export class TransaccionesEpagoComponent implements OnInit, AfterViewInit {
  transactions: EpagoTransaction[] = [];
  filteredTransactions: EpagoTransaction[] = [];
  
  // Filtros
  filters = {
    codigoEpago: '',
    fechaDesde: '',
    fechaHasta: '',
    };

  // Modal
  modalTitle: string = '';
  modalMode: 'create' | 'edit' = 'create';
  currentTransaction: EpagoTransaction = this.getEmptyTransaction();

  // Loading state
  isLoading: boolean = false;

  // Instancias de flatpickr
  private fechaDesdePicker: any;
  private fechaHastaPicker: any;

  constructor(private epagoService: EpagoService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngAfterViewInit(): void {
    // Inicializar después de que la vista esté completamente cargada
    setTimeout(() => {
      this.initializeDatePickers();
    }, 300);
  }

  initializeDatePickers(): void {
    try {
      // Verificar que flatpickr esté disponible
      if (typeof flatpickr !== 'undefined') {
        const config = {
          dateFormat: 'd/m/Y',
          locale: 'es',
          allowInput: true,
          clickOpens: true
        };

        // Inicializar Fecha Desde
        const fechaDesdeEl = document.getElementById('fechaDesde');
        if (fechaDesdeEl && !this.fechaDesdePicker) {
          this.fechaDesdePicker = flatpickr(fechaDesdeEl, {
            ...config,
            onChange: (selectedDates: any, dateStr: string) => {
              this.filters.fechaDesde = dateStr;
            }
          });
        }

        // Inicializar Fecha Hasta
        const fechaHastaEl = document.getElementById('fechaHasta');
        if (fechaHastaEl && !this.fechaHastaPicker) {
          this.fechaHastaPicker = flatpickr(fechaHastaEl, {
            ...config,
            onChange: (selectedDates: any, dateStr: string) => {
              this.filters.fechaHasta = dateStr;
            }
          });
        }

        console.log('Flatpickr inicializado correctamente');
      } else {
        console.warn('Flatpickr no está disponible');
      }
    } catch (error) {
      console.error('Error al inicializar flatpickr:', error);
    }
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.epagoService.getTransactions().subscribe(
      data => {
        this.transactions = data;
        this.filteredTransactions = [...data];
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar transacciones:', error);
        this.isLoading = false;
        alert('Error al cargar las transacciones. Por favor intente nuevamente.');
      }
    );
  }

  applyFilters(): void {
    this.isLoading = true;
    
    // Filtrado en el frontend
    this.filteredTransactions = this.transactions.filter(t => {
      let matches = true;
      
      // Filtro por código Epago
      if (this.filters.codigoEpago && this.filters.codigoEpago.trim() !== '') {
        matches = matches && t.codigoEpago.toLowerCase().includes(this.filters.codigoEpago.toLowerCase());
      }
      
      // Filtro por fecha desde
      if (this.filters.fechaDesde && this.filters.fechaDesde.trim() !== '') {
        const fechaDesde = this.parseDateString(this.filters.fechaDesde);
        const fechaTransaccion = this.parseDateString(t.fechaSolicitud);
        if (fechaDesde && fechaTransaccion) {
          matches = matches && fechaTransaccion >= fechaDesde;
        }
      }
      
      // Filtro por fecha hasta
      if (this.filters.fechaHasta && this.filters.fechaHasta.trim() !== '') {
        const fechaHasta = this.parseDateString(this.filters.fechaHasta);
        const fechaTransaccion = this.parseDateString(t.fechaSolicitud);
        if (fechaHasta && fechaTransaccion) {
          matches = matches && fechaTransaccion <= fechaHasta;
        }
      }

      
      return matches;
    });

    setTimeout(() => {
      this.isLoading = false;
      console.log(`Filtros aplicados. ${this.filteredTransactions.length} transacciones encontradas.`);
    }, 300);
  }

  clearFilters(): void {
    this.filters = {
      codigoEpago: '',
      fechaDesde: '',
      fechaHasta: '',

    };
    
    // Limpiar los datepickers
    if (this.fechaDesdePicker) {
      this.fechaDesdePicker.clear();
    }
    if (this.fechaHastaPicker) {
      this.fechaHastaPicker.clear();
    }
    
    this.filteredTransactions = [...this.transactions];
    console.log('Filtros limpiados');
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.modalTitle = 'Ingresar Nueva Transacción';
    this.currentTransaction = this.getEmptyTransaction();
    $('#transactionModal').modal('show');
  }

  openEditModal(transaction: EpagoTransaction): void {
    this.modalMode = 'edit';
    this.modalTitle = 'Editar Consolidado ' + transaction.codigoEpago;
    this.currentTransaction = { ...transaction };
    $('#transactionModal').modal('show');
  }

  saveTransaction(): void {
    // Validaciones básicas
    if (!this.currentTransaction.codigoEpago || this.currentTransaction.codigoEpago.trim() === '') {
      alert('Por favor ingrese el código EPago');
      return;
    }
    
    if (!this.currentTransaction.botonPago || this.currentTransaction.botonPago.trim() === '') {
      alert('Por favor ingrese el botón de pago');
      return;
    }
    
    if (this.currentTransaction.valor <= 0) {
      alert('El valor debe ser mayor a 0');
      return;
    }

    if (this.modalMode === 'create') {
      this.epagoService.createTransaction(this.currentTransaction).subscribe(
        response => {
          this.loadTransactions();
          $('#transactionModal').modal('hide');
          alert('Transacción creada exitosamente');
        },
        error => {
          console.error('Error al crear transacción:', error);
          alert('Error al crear la transacción');
        }
      );
    } else {
      this.epagoService.updateTransaction(this.currentTransaction.id!, this.currentTransaction).subscribe(
        response => {
          this.loadTransactions();
          $('#transactionModal').modal('hide');
          alert('Transacción actualizada exitosamente');
        },
        error => {
          console.error('Error al actualizar transacción:', error);
          alert('Error al actualizar la transacción');
        }
      );
    }
  }

  deleteTransaction(transaction: EpagoTransaction): void {
    if (confirm(`¿Está seguro de eliminar la transacción ${transaction.codigoEpago}?`)) {
      this.epagoService.deleteTransaction(transaction.id!).subscribe(
        response => {
          this.loadTransactions();
          alert('Transacción eliminada exitosamente');
        },
        error => {
          console.error('Error al eliminar transacción:', error);
          alert('Error al eliminar la transacción');
        }
      );
    }
  }

  getEmptyTransaction(): EpagoTransaction {
    const now = new Date();
    const formattedDate = this.formatDate(now);
    
    return {
      codigoEpago: '',
      fechaSolicitud: formattedDate,
      usuarioIngreso: 'LATINOMEDICAL',
      botonPago: '',
      valor: 0,
      estaPagado: false,
      estaFacturado: false,
      valorFacturado: 0,
      valorPorFacturar: 0,
      valorAnulado: 0
    };
  }

  // Función auxiliar para parsear fechas en formato dd/mm/yyyy
  private parseDateString(dateStr: string): Date | null {
    try {
      // Intentar formato dd/mm/yyyy HH:mm:ss
      const parts = dateStr.split(' ');
      const dateParts = parts[0].split('/');
      
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Los meses en JS van de 0-11
        const year = parseInt(dateParts[2], 10);
        
        return new Date(year, month, day);
      }
      
      return null;
    } catch (error) {
      console.error('Error al parsear fecha:', error);
      return null;
    }
  }

  // Función auxiliar para formatear fechas
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  // Cleanup
  ngOnDestroy(): void {
    if (this.fechaDesdePicker) {
      this.fechaDesdePicker.destroy();
    }
    if (this.fechaHastaPicker) {
      this.fechaHastaPicker.destroy();
    }
  }
}