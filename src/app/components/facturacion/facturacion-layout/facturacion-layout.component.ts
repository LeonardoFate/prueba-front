import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturacion-layout',
  templateUrl: './facturacion-layout.component.html',
  styleUrls: ['./facturacion-layout.component.css']
})
export class FacturacionLayoutComponent implements OnInit {
  submenuItems = [
    { label: 'Transacciones Epago', route: '/facturacion/transacciones-epago' },
    { label: 'Transacciones Emitidas pacientes', route: '/facturacion/transacciones-emitidas' },
    { label: 'Flujo con menú lateral', route: '/facturacion/flujo-menu-lateral' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  goBack(): void {
    this.router.navigate(['/module-selection']);
  }
}