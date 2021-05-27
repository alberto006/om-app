import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  apiUrl = environment.apiUrl;

  //------------------------------------------------------------------------------------------------------------//
  getUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/om/usuarios`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener la lista de usuarios'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  getRolesUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/om/usuarios/roles`)
      .pipe(
        tap(),
        catchError(this.handleError('Error al obtener la lista de roles de usuarios'))
      )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  postUsuario(usuario:string,correo:string,rolID:number,password:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/om/usuarios/crear`,{usuario,correo,rolID,password})
      .pipe(
        tap(),
        catchError(this.handleError<any>('Error al crear el usuario'))
      )
  }

  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  updateUsuario(usuarioID:number,usuario:string,correo:string,activo:number,rolID:number,password:string,cambio_pass:number): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/om/usuarios/actualizar`,{usuarioID,usuario,correo,activo,rolID,password,cambio_pass})
      .pipe(
        tap(),
        catchError(this.handleError<any>('Error al crear el usuario'))
      )
  }

  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCTION PARA MOSTRAR MENSAJES EN PANTALLA AL USUARIO
  notificacion(mensaje:string){
    this._snackBar.open(mensaje, 'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCTION PARA MANEJO DE ERRORES
  private handleError<T>(operation = 'operation',result?: T){
    return (error:any): Observable<T>=>{
      console.log('error en la aplicacion: '+JSON.stringify(error));
      this.notificacion('Error en la aplicacion: '+operation)
     return of(result as T);
    }
  }
  //------------------------------------------------------------------------------------------------------------//


}
