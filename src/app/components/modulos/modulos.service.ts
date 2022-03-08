import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient,private _snackBar:MatSnackBar) { }
  //--------------------------------------------------------------------------------------------------------//
  getModulos():Observable<any>{
    return this.http.get(`${this.apiUrl}/om/modulos`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede obtener la lista de modulos del sistema'))
      )      
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  geComponents():Observable<any>{
    return this.http.get(`${this.apiUrl}/om/components`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede obtener la lista de componentes del sistema'))
      )      
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  getPermisosComponente(componenteID:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/om/components/${componenteID}`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede obtener la lista de componentes del sistema'))
      )      
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  getRoles():Observable<any>{
    return this.http.get(`${this.apiUrl}/om/usuarios/roles`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede obtener la lista de roles del sistema'))
      )
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  postPermiso(componenteID:number,rolID:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/om/componentes/asignar`,{componenteID,rolID})
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede agregar el permiso en el sistema'))
      )
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  deletePermiso(componenteID:number,rolID:number):Observable<any>{
    return this.http.post(`${this.apiUrl}/om/componentes/remover`,{componenteID,rolID})
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede agregar el permiso en el sistema'))
      )
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      console.table(error)
      return of(result as T)
      
    }
  }
  //--------------------------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------------------------//
  notificacion(mensaje: string ){
    this._snackBar.open(mensaje,'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }
  //--------------------------------------------------------------------------------------------------------//

}
