import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { ModuleSelectionComponent } from './components/module-selection/module-selection.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FacturacionLayoutComponent } from './components/facturacion/facturacion-layout/facturacion-layout.component';
import { TransaccionesEpagoComponent } from './components/facturacion/transacciones-epago/transacciones-epago.component';
import { TransaccionesEmitidasComponent } from './components/facturacion/transacciones-emitidas/transacciones-emitidas.component';
import { FlujoMenuLateralComponent } from './components/facturacion/flujo-menu-lateral/flujo-menu-lateral.component';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { EpagoModalComponent } from './components/facturacion/epago-modal/epago-modal.component';
import { ModulePlaceholderComponent } from './components/module-placeholder/module-placeholder.component';

// Services
import { AuthService } from './services/auth.service';
import { EpagoService } from './services/epago.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModuleSelectionComponent,
    HeaderComponent,
    FacturacionLayoutComponent,
    TransaccionesEpagoComponent,
    TransaccionesEmitidasComponent,
    FlujoMenuLateralComponent,
    AgendamientoComponent,
    EpagoModalComponent,
    ModulePlaceholderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    EpagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }