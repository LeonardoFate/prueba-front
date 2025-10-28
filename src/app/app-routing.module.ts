import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModuleSelectionComponent } from './components/module-selection/module-selection.component';
import { FacturacionLayoutComponent } from './components/facturacion/facturacion-layout/facturacion-layout.component';
import { TransaccionesEpagoComponent } from './components/facturacion/transacciones-epago/transacciones-epago.component';
import { TransaccionesEmitidasComponent } from './components/facturacion/transacciones-emitidas/transacciones-emitidas.component';
import { FlujoMenuLateralComponent } from './components/facturacion/flujo-menu-lateral/flujo-menu-lateral.component';
import { ModulePlaceholderComponent } from './components/module-placeholder/module-placeholder.component';

const routes: Routes = [
  // Ruta por defecto - Redirigir al login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Ruta del Login - ¡ESTA FALTABA!
  {
    path: 'login',
    component: LoginComponent
  },
  // Ruta de selección de módulos
  {
    path: 'module-selection',
    component: ModuleSelectionComponent
  },
  // Rutas de Facturación
  {
    path: 'facturacion',
    component: FacturacionLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'transacciones-epago',
        pathMatch: 'full'
      },
      {
        path: 'transacciones-epago',
        component: TransaccionesEpagoComponent
      },
      {
        path: 'transacciones-emitidas',
        component: TransaccionesEmitidasComponent
      },
      {
        path: 'flujo-menu-lateral',
        component: FlujoMenuLateralComponent
      }
    ]
  },
  // Rutas para los demás módulos con placeholder
  {
    path: 'agendamiento',
    component: ModulePlaceholderComponent
  },
  {
    path: 'atenciones-prioritarias',
    component: ModulePlaceholderComponent
  },
  {
    path: 'convenios',
    component: ModulePlaceholderComponent
  },
  {
    path: 'historia-clinica',
    component: ModulePlaceholderComponent
  },
  {
    path: 'parametrizacion',
    component: ModulePlaceholderComponent
  },
  {
    path: 'planificacion',
    component: ModulePlaceholderComponent
  },
  {
    path: 'seguridad',
    component: ModulePlaceholderComponent
  },
  // Ruta wildcard - Cualquier ruta no encontrada redirige al login
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }