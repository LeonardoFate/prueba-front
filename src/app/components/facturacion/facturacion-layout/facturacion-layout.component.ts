import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturacion-layout',
  templateUrl: './facturacion-layout.component.html',
  styleUrls: ['./facturacion-layout.component.css']
})
export class FacturacionLayoutComponent implements OnInit {
  submenuItems = [
    { 
      label: 'Transacciones Epago', 
      route: '/facturacion/transacciones-epago',
      icon: 'fa-credit-card'
    },
    { 
      label: 'Transacciones Emitidas pacientes', 
      route: '/facturacion/transacciones-emitidas',
      icon: 'fa-file-invoice'
    },
    { 
      label: 'Flujo con menú lateral', 
      route: '/facturacion/flujo-menu-lateral',
      icon: 'fa-bars'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  goBack(): void {
    this.router.navigate(['/module-selection']);
  }
}