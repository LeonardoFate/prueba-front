import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-placeholder',
  templateUrl: './module-placeholder.component.html',
  styleUrls: ['./module-placeholder.component.css']
})
export class ModulePlaceholderComponent implements OnInit {
  moduleName: string = '';
  moduleIcon: string = 'fa-cube';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Obtener el nombre del módulo desde la URL
    const url = this.router.url;
    const moduleMap: any = {
      '/agendamiento': { name: 'Agendamiento', icon: 'fa-calendar-alt' },
      '/atenciones-prioritarias': { name: 'Atenciones Prioritarias', icon: 'fa-exclamation-circle' },
      '/convenios': { name: 'Convenios', icon: 'fa-handshake' },
      '/historia-clinica': { name: 'Historia Clínica', icon: 'fa-file-medical-alt' },
      '/parametrizacion': { name: 'Parametrización', icon: 'fa-cog' },
      '/planificacion': { name: 'Planificación', icon: 'fa-calendar-check' },
      '/seguridad': { name: 'Seguridad', icon: 'fa-shield-alt' }
    };

    const moduleInfo = moduleMap[url];
    if (moduleInfo) {
      this.moduleName = moduleInfo.name;
      this.moduleIcon = moduleInfo.icon;
    }
  }

  goBack(): void {
    this.router.navigate(['/module-selection']);
  }
}