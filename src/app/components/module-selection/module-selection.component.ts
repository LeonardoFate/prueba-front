import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Module {
  id: number;
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-module-selection',
  templateUrl: './module-selection.component.html',
  styleUrls: ['./module-selection.component.css']
})
export class ModuleSelectionComponent implements OnInit {
  user: any;
  modules: Module[] = [
    { id: 1, name: 'Agendamiento', route: '/agendamiento', icon: 'calendar' },
    { id: 2, name: 'Atenciones Prioritarias', route: '/atenciones-prioritarias', icon: 'star' },
    { id: 3, name: 'Convenios', route: '/convenios', icon: 'handshake' },
    { id: 4, name: 'Facturación', route: '/facturacion', icon: 'file-invoice-dollar' },
    { id: 5, name: 'Historia Clínica', route: '/historia-clinica', icon: 'file-medical' },
    { id: 6, name: 'Parametrización', route: '/parametrizacion', icon: 'cog' },
    { id: 7, name: 'Planificación', route: '/planificacion', icon: 'clipboard-list' },
    { id: 8, name: 'Seguridad', route: '/seguridad', icon: 'shield-alt' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = this.authService.getUser();
  }

  navigateToModule(module: Module): void {
    this.router.navigate([module.route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}