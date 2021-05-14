import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { BitacoraEventosComponent } from './components/bitacora-eventos/bitacora-eventos.component';
import { BitacoraReporteComponent } from './components/bitacora-reporte/bitacora-reporte.component';
import { CampaingInTimeComponent } from './components/campaing-in-time/campaing-in-time.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:AuthComponent},
  {path:'inicio',component:InicioComponent},
  {path:'campaing-in-time',component:CampaingInTimeComponent,canActivate:[AuthGuard]},
  {path:'bitacora-reporte',component:BitacoraReporteComponent,canActivate:[AuthGuard]},
  {path:'bitacora-eventos',component:BitacoraEventosComponent,canActivate:[AuthGuard]},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
