import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortadaService {

  apiURL = environment.apiRedOPS;

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  getNoticias():Observable<any>{
    return this.http.get<any>(`${this.apiURL}/noticias`).pipe(
      tap(),
      catchError(this.handleError<any>('Error al obtener las noticias'))

    )
  }

  notificacion(mensaje:string){
    this._snackBar.open(mensaje, 'Cerrar',{
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
