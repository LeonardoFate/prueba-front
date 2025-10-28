import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var $: any; // Para usar jQuery/Bootstrap

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
  selectedUser: string = 'user';
  
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

  onUserSelectionChange(value: string): void {
    console.log('Usuario seleccionado:', value);
    
    if (value === 'logout') {
      // Mostrar el modal de confirmación
      this.showLogoutModal();
    }
  }

  showLogoutModal(): void {
    // Mostrar el modal usando Bootstrap
    $('#logoutModal').modal('show');
  }

  cancelLogout(): void {
    console.log('Cierre de sesión cancelado');
    // Cerrar el modal
    $('#logoutModal').modal('hide');
    // Resetear el select al valor por defecto
    this.selectedUser = 'user';
  }

  confirmLogout(): void {
    console.log('Cerrando sesión confirmado...');
    // Cerrar el modal
    $('#logoutModal').modal('hide');
    // Ejecutar el logout
    this.authService.logout();
    // Redirigir al login
    this.router.navigate(['/login']).then(() => {
      console.log('Redirigido al login exitosamente');
    });
  }
}