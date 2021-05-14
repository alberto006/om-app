import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  apiUrl = environment.apiUrl;

  //------------------------------------------------------------------------------------------------------------//

  //FUNCION PARA OBTENER LA LISTA DE CATEGORIAS DE EVENTOS
  getListaCategorias():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bitacora/categorias`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener la lista de categorias'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  getListaEventos():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bitacora/eventos`)
    .pipe(
      tap(),
      
      catchError(this.handleError<any>('Error al obtener la lista de categorias'))
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
