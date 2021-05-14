import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitacoraReporteService {

  constructor(private _snackBar:MatSnackBar, private http:HttpClient) { 
    console.log(environment.production)

  }

  httpHeaders = new HttpHeaders({'content-type':'application/json'});

  //apiUrl = 'http://10.8.8.81:1880/api/neotel';
  //apiUrl = '/api/neotel';
  apiUrl = environment.apiUrl;

  reporteResumenPrincipal():Observable<any>{
    return this.http.get(`${this.apiUrl}/bitacora/reporte/resumen/principal`)
            .pipe(
              tap(),
              catchError(this.handleError<any>('No se pudo obtener la informacion del reporte'))

            )
  }
  
  reporteResumen2():Observable<any>{
    return this.http.get(`${this.apiUrl}/bitacora/reporte/resumen2`)
            .pipe(
              tap(),
              catchError(this.handleError<any>('No se pudo obtener la informacion del reporte'))

            )
  }

  getReporteBitacora(reporte:string, inicio:string,fin:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/bitacora/reporte/${reporte}/${inicio}/${fin}`)
      .pipe(
        tap(),
        catchError(this.handleError<any>('No se puede obtener la informacion del reporte: '+reporte))
      )
  }

  notificacion(mensaje:string){
    this._snackBar.open(mensaje, 'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }

  private handleError<T>(operation= 'operation',result?:T){
    return (error:any):Observable<T>=>{
      console.log('Error en la aplication: '+JSON.stringify(error));
      this.notificacion('Error ne la aplicacion: '+operation)
      return of(result as T)
    }
  }




}
