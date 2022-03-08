import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';


import { CampaingInTimeComponent, ModalListaAgentes, ModalBitacoraCrm, ModalBitacoraAgente } from './components/campaing-in-time/campaing-in-time.component';
import { AuthComponent } from './components/auth/auth.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BitacoraReporteComponent } from './components/bitacora-reporte/bitacora-reporte.component';
import { BitacoraEventosComponent, ModalEventoAgregar,ModalEventoEditar } from './components/bitacora-eventos/bitacora-eventos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent, ModalCrearUsuario, ModalEditarUsuario,ModalCrearRol } from './components/admin/usuarios/usuarios.component';
import { ModulosComponent,ModalPermisosComponente } from './components/admin/modulos/modulos.component';
import { ComponentesComponent } from './components/admin/componentes/componentes.component';
import { DashboardsComponent } from './public/dashboards/dashboards.component';
import { HistorialComponent } from './components/historial/historial.component';
import { PortadaComponent } from './components/portada/portada.component';
import { CandidatosComponent, ModalCandidatoPerfil } from './components/rh/candidatos/candidatos.component';
import { ModalPerfilCandidato, ReclutamientoComponent } from './components/rh/reclutamiento/reclutamiento.component';
import { ForbiddenComponent } from './components/public/forbidden/forbidden.component';
import { DepartamentosComponent } from './components/tickets/departamentos/departamentos.component';
import { CategoriasComponent } from './components/tickets/categorias/categorias.component';
import { TicketsComponent } from './components/tickets/tickets/tickets.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { GeneradorFirmasComponent } from './components/generador-firmas/generador-firmas.component';
import { CertficiadosRacComponent } from './components/certficiados-rac/certficiados-rac.component';
import { RapiwhaBlasterComponent,ModalRapiwhaAddKey, ModalRapiwhaEditKey } from './rapiwha-blaster/rapiwha-blaster.component';
import { ListasRpwComponent } from './rapiwha-blaster/listas-rpw/listas-rpw.component';
import { ModalCreateListComponent } from './rapiwha-blaster/listas-rpw/modal-create-list/modal-create-list.component';






@NgModule({
  declarations: [
    AppComponent,
    CampaingInTimeComponent,ModalListaAgentes,ModalBitacoraCrm,ModalBitacoraAgente,
    AuthComponent,
    PageNotFoundComponent,
    BitacoraReporteComponent,
    BitacoraEventosComponent,ModalEventoAgregar,ModalEventoEditar,
    InicioComponent,
    UsuariosComponent,ModalCrearUsuario,ModalEditarUsuario,ModalCrearRol,
    ModulosComponent,ModalPermisosComponente,
    ComponentesComponent,
    DashboardsComponent,
    HistorialComponent,
    PortadaComponent,
    CandidatosComponent,ModalCandidatoPerfil, ReclutamientoComponent, ForbiddenComponent, ModalPerfilCandidato, DepartamentosComponent, CategoriasComponent, TicketsComponent, TarjetaComponent, GeneradorFirmasComponent, CertficiadosRacComponent, 
    RapiwhaBlasterComponent, ModalRapiwhaAddKey,ModalRapiwhaEditKey, ListasRpwComponent, ModalCreateListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    jqxChartModule,

    //Material Components
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
