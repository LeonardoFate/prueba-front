import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModuleSelectionComponent } from './components/module-selection/module-selection.component';
import { FacturacionLayoutComponent } from './components/facturacion/facturacion-layout/facturacion-layout.component';
import { TransaccionesEpagoComponent } from './components/facturacion/transacciones-epago/transacciones-epago.component';
import { TransaccionesEmitidasComponent } from './components/facturacion/transacciones-emitidas/transacciones-emitidas.component';
import { FlujoMenuLateralComponent } from './components/facturacion/flujo-menu-lateral/flujo-menu-lateral.component';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'module-selection', component: ModuleSelectionComponent },
  { path: 'agendamiento', component: AgendamientoComponent },
  { 
    path: 'facturacion', 
    component: FacturacionLayoutComponent,
    children: [
      { path: '', redirectTo: 'transacciones-epago', pathMatch: 'full' },
      { path: 'transacciones-epago', component: TransaccionesEpagoComponent },
      { path: 'transacciones-emitidas', component: TransaccionesEmitidasComponent },
      { path: 'flujo-menu-lateral', component: FlujoMenuLateralComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }