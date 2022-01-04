import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclutamientoService {

  api = environment.webOPS;

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  getCandidatos(FechaInicio:string,FechaFin:string):Observable<any>{
    return this.http.post(`${this.api}/rh/ListaCandidatos`,{FechaInicio,FechaFin})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los candidatos'))
    )
  }

  getCandidatoById(id:string):Observable<any>{
    return this.http.post(`${this.api}/rh/candidato`,{id})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener los datos del candidato'))
    )
  }

  notificacion(mensaje:string){
    this.snackbar.open(mensaje, 'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }


  private handleError<T>(operation = 'Respuesta servidor', result?: T){
    return (error:any): Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      this.notificacion('Error en la aplicacion: '+operation)
      return of(result as T)
    }
  }
  
}
