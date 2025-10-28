import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flujo-menu-lateral',
  templateUrl: './flujo-menu-lateral.component.html',
  styleUrls: ['./flujo-menu-lateral.component.css']
})
export class FlujoMenuLateralComponent implements OnInit {
  selectedSection: string = 'ordenes-factura-manual';
  
  menuItems = [
    { id: 'ordenes-factura-manual', label: 'Ordenes para factura manual', icon: 'file-invoice' },
    { id: 'cierre-caja', label: 'Cierre de caja', icon: 'cash-register' },
    { id: 'registros-facturas', label: 'Registros Facturas', icon: 'file-alt' },
    { id: 'diagnosticos', label: 'Diagnosticos', icon: 'stethoscope' },
    { id: 'procedimiento-medico', label: 'Procedimiento Médico', icon: 'procedures' },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: 'clipboard-list' }
  ];

  patientInfo = {
    name: 'Bustamante Sánchez Diana',
    age: '33 AÑOS 5 MESES'
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectSection(sectionId: string): void {
    this.selectedSection = sectionId;
  }
}