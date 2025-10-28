import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var $: any;
declare var flatpickr: any;

interface TransactionEmitida {
  id?: number;
  acciones: string;
  reenviarInfo: boolean;
  tirilla: string;
  ride: string;
  xml: string;
  ordenMedica: string;
  fechaTransaccion: string;
  numTransaccion: string;
  fechaOrden: string;
  numOrden: string;
  numFactura: string;
  beneficiario: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-transacciones-emitidas',
  templateUrl: './transacciones-emitidas.component.html',
  styleUrls: ['./transacciones-emitidas.component.css']
})
export class TransaccionesEmitidasComponent implements OnInit, AfterViewInit, OnDestroy {
  transactions: TransactionEmitida[] = [];
  paginatedTransactions: TransactionEmitida[] = [];
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  visiblePages: number[] = [];

  // Filtros
  paciente: string = '0930988316 - Plua Chilan Jose Leonel';
  fechaDesde: string = '15/08/2024';
  fechaHasta: string = '15/09/2024';
  sucursal: string = 'Veris - Kennedy';

  // Instancias de flatpickr y select2
  private fechaDesdePicker: any;
  private fechaHastaPicker: any;
  private pacienteSelect: any;
  private sucursalSelect: any;

  constructor() { }

  ngOnInit(): void {
    this.loadMockData();
    this.updatePagination();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeDatePickers();
      this.initializeSelect2();
    }, 300);
  }

  ngOnDestroy(): void {
    // Limpiar flatpickr
    if (this.fechaDesdePicker) {
      this.fechaDesdePicker.destroy();
    }
    if (this.fechaHastaPicker) {
      this.fechaHastaPicker.destroy();
    }
    
    // Limpiar select2
    if (typeof $ !== 'undefined') {
      $('#paciente').select2('destroy');
      $('#sucursal').select2('destroy');
    }
  }

  initializeDatePickers(): void {
    try {
      if (typeof flatpickr !== 'undefined') {
        const config = {
          dateFormat: 'd/m/Y',
          locale: 'es',
          allowInput: true,
          defaultDate: null
        };

        // Inicializar Fecha Desde
        const fechaDesdeEl = document.getElementById('fechaDesde');
        if (fechaDesdeEl && !this.fechaDesdePicker) {
          this.fechaDesdePicker = flatpickr(fechaDesdeEl, {
            ...config,
            defaultDate: this.fechaDesde,
            onChange: (selectedDates: any, dateStr: string) => {
              this.fechaDesde = dateStr;
            }
          });
        }

        // Inicializar Fecha Hasta
        const fechaHastaEl = document.getElementById('fechaHasta');
        if (fechaHastaEl && !this.fechaHastaPicker) {
          this.fechaHastaPicker = flatpickr(fechaHastaEl, {
            ...config,
            defaultDate: this.fechaHasta,
            onChange: (selectedDates: any, dateStr: string) => {
              this.fechaHasta = dateStr;
            }
          });
        }

        console.log('Flatpickr inicializado en Transacciones Emitidas');
      }
    } catch (error) {
      console.error('Error al inicializar flatpickr:', error);
    }
  }

  initializeSelect2(): void {
    try {
      if (typeof $ !== 'undefined' && $.fn.select2) {
        // Configuración para Paciente
        this.pacienteSelect = $('#paciente').select2({
          width: '100%',
          placeholder: 'Buscar paciente',
          allowClear: true,
          language: {
            noResults: function() {
              return "No se encontraron resultados";
            }
          }
        });

        // Listener para cambios en paciente
        this.pacienteSelect.on('change', (e: any) => {
          this.paciente = e.target.value;
        });

        // Configuración para Sucursal
        this.sucursalSelect = $('#sucursal').select2({
          width: '100%',
          placeholder: 'Seleccione sucursal',
          minimumResultsForSearch: -1 // Deshabilitar búsqueda para pocos items
        });

        // Listener para cambios en sucursal
        this.sucursalSelect.on('change', (e: any) => {
          this.sucursal = e.target.value;
        });

        console.log('Select2 inicializado en Transacciones Emitidas');
      }
    } catch (error) {
      console.error('Error al inicializar select2:', error);
    }
  }

  loadMockData(): void {
    // Datos de ejemplo
    this.transactions = [
      {
        id: 1,
        acciones: '',
        reenviarInfo: true,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '06/09/2024',
        numTransaccion: '17075097',
        fechaOrden: '06/09/2024',
        numOrden: '33567065',
        numFactura: '003-100-001473275',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 2,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '06/09/2024',
        numTransaccion: '17075081',
        fechaOrden: '06/09/2024',
        numOrden: '33567055',
        numFactura: '003-100-001473273',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 3,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '05/09/2024',
        numTransaccion: '17075066',
        fechaOrden: '05/09/2024',
        numOrden: '33567007',
        numFactura: '003-100-001473272',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 4,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '26/08/2024',
        numTransaccion: '17075015',
        fechaOrden: '26/08/2024',
        numOrden: '33566935',
        numFactura: '003-100-001473271',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 5,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '21/08/2024',
        numTransaccion: '17075004',
        fechaOrden: '21/08/2024',
        numOrden: '33566909',
        numFactura: '003-100-001473267',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 6,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '21/08/2024',
        numTransaccion: '17075004',
        fechaOrden: '21/08/2024',
        numOrden: '33566909',
        numFactura: '003-100-001473267',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 7,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '22/08/2024',
        numTransaccion: '17075005',
        fechaOrden: '22/08/2024',
        numOrden: '33566910',
        numFactura: '003-100-001473268',
        beneficiario: 'Seguros Equinoccial',
        expanded: false
      },
      {
        id: 8,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '23/08/2024',
        numTransaccion: '17075006',
        fechaOrden: '23/08/2024',
        numOrden: '33566911',
        numFactura: '003-100-001473269',
        beneficiario: 'IESS',
        expanded: false
      },
      {
        id: 9,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '24/08/2024',
        numTransaccion: '17075007',
        fechaOrden: '24/08/2024',
        numOrden: '33566912',
        numFactura: '003-100-001473270',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 10,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '25/08/2024',
        numTransaccion: '17075008',
        fechaOrden: '25/08/2024',
        numOrden: '33566913',
        numFactura: '003-100-001473271',
        beneficiario: 'Seguros Sucre',
        expanded: false
      },
      {
        id: 11,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '26/08/2024',
        numTransaccion: '17075009',
        fechaOrden: '26/08/2024',
        numOrden: '33566914',
        numFactura: '003-100-001473272',
        beneficiario: 'Ministerio de Salud',
        expanded: false
      },
      {
        id: 12,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '27/08/2024',
        numTransaccion: '17075010',
        fechaOrden: '27/08/2024',
        numOrden: '33566915',
        numFactura: '003-100-001473273',
        beneficiario: 'Particular',
        expanded: false
      },
      {
        id: 13,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '28/08/2024',
        numTransaccion: '17075011',
        fechaOrden: '28/08/2024',
        numOrden: '33566916',
        numFactura: '003-100-001473274',
        beneficiario: 'Seguro Privado',
        expanded: false
      },
      {
        id: 14,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '29/08/2024',
        numTransaccion: '17075012',
        fechaOrden: '29/08/2024',
        numOrden: '33566917',
        numFactura: '003-100-001473275',
        beneficiario: 'IESS',
        expanded: false
      },
      {
        id: 15,
        acciones: '',
        reenviarInfo: false,
        tirilla: 'TIRILLA',
        ride: 'RIDE',
        xml: 'XML',
        ordenMedica: 'OM',
        fechaTransaccion: '30/08/2024',
        numTransaccion: '17075013',
        fechaOrden: '30/08/2024',
        numOrden: '33566918',
        numFactura: '003-100-001473276',
        beneficiario: 'Particular',
        expanded: false
      }
    ];
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(startIndex, endIndex);
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const maxVisiblePages = 5;
    const pages: number[] = [];
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    this.visiblePages = pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
      console.log(`Navegando a página ${page}`);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  buscar(): void {
    console.log('Aplicando filtros de búsqueda...');
    console.log('Paciente:', this.paciente);
    console.log('Fecha Desde:', this.fechaDesde);
    console.log('Fecha Hasta:', this.fechaHasta);
    console.log('Sucursal:', this.sucursal);
    
    // Aquí puedes implementar la lógica de filtrado si es necesario
    // Por ahora solo muestra los datos actuales
    
    // Ejemplo: si quieres filtrar por fechas
    // this.transactions = this.transactions.filter(t => {
    //   // lógica de filtrado
    // });
    
    this.currentPage = 1;
    this.updatePagination();
    
    alert('Búsqueda realizada exitosamente');
  }

  downloadDocument(type: string, transaction: TransactionEmitida): void {
    console.log(`Descargando ${type} para transacción ${transaction.numTransaccion}`);
    alert(`Descargando ${type} para transacción ${transaction.numTransaccion}`);
  }

  toggleExpandRow(transaction: TransactionEmitida): void {
    transaction.expanded = !transaction.expanded;
    console.log(`Fila ${transaction.numTransaccion} ${transaction.expanded ? 'expandida' : 'colapsada'}`);
  }

  reenviarInformacion(transaction: TransactionEmitida): void {
    console.log(`Reenviando información de transacción ${transaction.numTransaccion}`);
    alert(`Reenviando información de transacción ${transaction.numTransaccion}`);
  }
}