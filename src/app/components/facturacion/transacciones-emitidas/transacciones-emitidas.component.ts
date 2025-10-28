import { Component, OnInit } from '@angular/core';

interface TransactionEmitida {
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
}

@Component({
  selector: 'app-transacciones-emitidas',
  templateUrl: './transacciones-emitidas.component.html',
  styleUrls: ['./transacciones-emitidas.component.css']
})
export class TransaccionesEmitidasComponent implements OnInit {
  transactions: TransactionEmitida[] = [];
  paginatedTransactions: TransactionEmitida[] = [];
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  // Filtros
  paciente: string = '0930988316 - Plua Chilan Jose Leonel';
  fechaDesde: string = '15/08/2024';
  fechaHasta: string = '15/09/2024';
  sucursal: string = 'Veris - Kennedy';

  constructor() { }

  ngOnInit(): void {
    this.loadMockData();
    this.updatePagination();
  }

  loadMockData(): void {
    // Datos de ejemplo
    this.transactions = [
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Seguros Equinoccial'
      },
      {
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
        beneficiario: 'IESS'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Seguros Sucre'
      },
      {
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
        beneficiario: 'Ministerio de Salud'
      },
      {
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
        beneficiario: 'Particular'
      },
      {
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
        beneficiario: 'Seguro Privado'
      },
      {
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
        beneficiario: 'IESS'
      },
      {
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
        beneficiario: 'Particular'
      }
    ];
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
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

  buscar(): void {
    // Implementar lógica de búsqueda si es necesario
    console.log('Buscando transacciones...');
  }

  downloadDocument(type: string, transaction: TransactionEmitida): void {
    alert(`Descargando ${type} para transacción ${transaction.numTransaccion}`);
  }

  toggleExpandRow(transaction: any): void {
    // Toggle para expandir información adicional
    transaction.expanded = !transaction.expanded;
  }
}