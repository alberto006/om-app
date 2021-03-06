import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulosComponent } from './components/admin/modulos/modulos.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { BitacoraEventosComponent } from './components/bitacora-eventos/bitacora-eventos.component';
import { BitacoraReporteComponent } from './components/bitacora-reporte/bitacora-reporte.component';
import { CampaingInTimeComponent } from './components/campaing-in-time/campaing-in-time.component';
import { HistorialComponent } from './components/historial/historial.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PortadaComponent } from './components/portada/portada.component';
import { CandidatosComponent } from './components/rh/candidatos/candidatos.component';
import { DashboardsComponent } from './public/dashboards/dashboards.component';
import { ReclutamientoComponent } from './components/rh/reclutamiento/reclutamiento.component';
import { ForbiddenComponent } from './components/public/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'dashboards', component: DashboardsComponent },
  { path: 'inicio', component: InicioComponent },
  {path: 'campaing-in-time',component: CampaingInTimeComponent,canActivate: [AuthGuard]},
  { path: 'bitacora-reporte', component: BitacoraReporteComponent, canActivate: [AuthGuard] },
  { path: 'bitacora-eventos', component: BitacoraEventosComponent, canActivate: [AuthGuard] },
  {path: 'usuarios',component: UsuariosComponent,canActivate: [AuthGuard]},
  {path: 'modulos',component: ModulosComponent,canActivate: [AuthGuard]},
  { path: 'historial/:cuenta', component: HistorialComponent },
  { path: 'portada', component: PortadaComponent },
  {path: 'Candidatos',component: CandidatosComponent,canActivate: [AuthGuard]},
  { path: 'Reclutamiento', component: ReclutamientoComponent, canActivate: [AuthGuard] },
  { path: 'acceso-denegado', component: ForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
