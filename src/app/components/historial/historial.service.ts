import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  HistorialCuenta(cuenta:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/historial`,{cuenta})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos'))
    )
  }

  FechaAgenda(cuenta:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/historial/agenda`,{cuenta})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos'))
    )
  }

  HistorialCRM(cuenta:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/historial-crm`,{cuenta})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos de CRM'))
    )
  }

  HistorialCobros(cuenta:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/historial-c2010`,{cuenta})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos de CRM'))
    )
  }

  HistorialDavivienda(cuenta:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/historial/davivienda`,{cuenta})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos de Davivienda'))
      )
  }

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
