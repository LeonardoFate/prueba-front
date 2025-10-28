import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleSelectionComponent } from './components/module-selection/module-selection.component';
import { FacturacionLayoutComponent } from './components/facturacion/facturacion-layout/facturacion-layout.component';
import { TransaccionesEpagoComponent } from './components/facturacion/transacciones-epago/transacciones-epago.component';
import { TransaccionesEmitidasComponent } from './components/facturacion/transacciones-emitidas/transacciones-emitidas.component';
import { FlujoMenuLateralComponent } from './components/facturacion/flujo-menu-lateral/flujo-menu-lateral.component';
import { ModulePlaceholderComponent } from './components/module-placeholder/module-placeholder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/module-selection',
    pathMatch: 'full'
  },
  {
    path: 'module-selection',
    component: ModuleSelectionComponent
  },
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
  {
    path: '**',
    redirectTo: '/module-selection'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }