import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-placeholder',
  templateUrl: './module-placeholder.component.html',
  styleUrls: ['./module-placeholder.component.css']
})
export class ModulePlaceholderComponent implements OnInit {
  moduleName: string = '';
  moduleIcon: string = '';

  // Mapeo de módulos con sus iconos
  moduleConfig: any = {
    'agendamiento': {
      name: 'Agendamiento',
      icon: 'fa-calendar-alt'
    },
    'atenciones-prioritarias': {
      name: 'Atenciones Prioritarias',
      icon: 'fa-exclamation-circle'
    },
    'convenios': {
      name: 'Convenios',
      icon: 'fa-handshake'
    },
    'historia-clinica': {
      name: 'Historia Clínica',
      icon: 'fa-file-medical-alt'
    },
    'parametrizacion': {
      name: 'Parametrización',
      icon: 'fa-cog'
    },
    'planificacion': {
      name: 'Planificación',
      icon: 'fa-calendar-check'
    },
    'seguridad': {
      name: 'Seguridad',
      icon: 'fa-shield-alt'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener el nombre del módulo desde la ruta
    this.route.params.subscribe(params => {
      const moduleKey = params['module'];
      if (this.moduleConfig[moduleKey]) {
        this.moduleName = this.moduleConfig[moduleKey].name;
        this.moduleIcon = this.moduleConfig[moduleKey].icon;
      } else {
        this.moduleName = 'Módulo';
        this.moduleIcon = 'fa-cube';
      }
    });
  }
}