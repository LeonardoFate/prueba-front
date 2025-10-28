import { Component, OnInit } from '@angular/core';
import { EpagoService, EpagoTransaction } from '../../../services/epago.service';

declare var $: any;

@Component({
  selector: 'app-transacciones-epago',
  templateUrl: './transacciones-epago.component.html',
  styleUrls: ['./transacciones-epago.component.css']
})
export class TransaccionesEpagoComponent implements OnInit {
  transactions: EpagoTransaction[] = [];
  filteredTransactions: EpagoTransaction[] = [];
  
  // Filtros
  filters = {
    codigoEpago: '',
    fechaDesde: '',
    fechaHasta: '',
    pagadoEnEpago: false
  };

  // Modal
  modalTitle: string = '';
  modalMode: 'create' | 'edit' = 'create';
  currentTransaction: EpagoTransaction = this.getEmptyTransaction();

  // Loading state
  isLoading: boolean = false;

  constructor(private epagoService: EpagoService) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.initializeDatePickers();
  }

  initializeDatePickers(): void {
    // Inicializar flatpickr para los campos de fecha
    setTimeout(() => {
      if (typeof $ !== 'undefined' && $.fn.flatpickr) {
        $('.datepicker').flatpickr({
          dateFormat: 'd/m/Y',
          locale: 'es'
        });
      }
    }, 100);
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.epagoService.getTransactions().subscribe(
      data => {
        this.transactions = data;
        this.filteredTransactions = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al cargar transacciones:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    this.isLoading = true;
    
    // Simulación de filtrado
    this.filteredTransactions = this.transactions.filter(t => {
      let matches = true;
      
      if (this.filters.codigoEpago) {
        matches = matches && t.codigoEpago.includes(this.filters.codigoEpago);
      }
      
      // Aquí se pueden agregar más filtros según necesidad
      
      return matches;
    });

    setTimeout(() => this.isLoading = false, 300);
  }

  clearFilters(): void {
    this.filters = {
      codigoEpago: '',
      fechaDesde: '',
      fechaHasta: '',
      pagadoEnEpago: false
    };
    this.filteredTransactions = this.transactions;
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.modalTitle = 'Ingresar Nueva Transacción';
    this.currentTransaction = this.getEmptyTransaction();
    $('#transactionModal').modal('show');
  }

  openEditModal(transaction: EpagoTransaction): void {
    this.modalMode = 'edit';
    this.modalTitle = 'Editar Transacción ' + transaction.codigoEpago;
    this.currentTransaction = { ...transaction };
    $('#transactionModal').modal('show');
  }

  saveTransaction(): void {
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
    return {
      codigoEpago: '',
      fechaSolicitud: new Date().toLocaleString(),
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
}