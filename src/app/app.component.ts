import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'gtr-app';
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  usuario: string = "";
  permisos: any[] = [];
  modulos: string[] = [];   


  ngOnInit(): void {
    this.getPermisos()
  }

  ngAfterViewInit():void{    
    this.generarComponentes()
  }

  usuarioSesion(): string {
    var usuario: string = "";
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      usuario = sessionStorage.getItem('usuario') || "";
      
    }
    return usuario;
  }

  getPermisos(){
    if (sessionStorage.getItem('isLoggedIn') == "true") {
      var permisosSession = sessionStorage.getItem('permisos') || "";
      if (permisosSession != "") {
        this.permisos = JSON.parse(permisosSession);
      }
    }
  }

  generarComponentes() {
    var modulo = "";
    this.permisos.map((p: any) => {
      if (p.MODULO != modulo) {
        this.modulos.push(p.MODULO)
        modulo = p.MODULO;             
      }
    })    
  }

  CerrarSesion() {
    this.authService.logout()
    sessionStorage.removeItem('permisos');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }



}
