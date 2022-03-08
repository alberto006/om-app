import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntervalosService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  //apiUrl = 'http://10.8.8.81:1880/api/neotel';
  //apiUrl = '/api/neotel';
  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  //------------------------------------------------------------------------------------------------------------//
  // FUNCION QUE OBTIENE LA INFORMACION DE UN CRM POR INTERVALO
  getIntervaloData(crm:string,ncrm:number,date:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/intervalos/${crm}/${ncrm}/${date}`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pudieron obtener los datos'))
      )    
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCION QUE OBTIENE LA INFORMACION DE LOS AGENTES DE UN CRM
  getAgentesData(crm:string,ncrm:number,date:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/agentes/${crm}/${ncrm}/${date}`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pueden obtener los datos por agente'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCTION PARA OBTENER LA LISTA DE CRMS DEL SISTEMA
  getListaCrms():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/crms`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se puede obtener la lista de CRMS'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCION QUE OBTIENE LA LISTA DE EVENTOS DISPONIBLES A NIVEL DE CRM
  getEventosCrm():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bitacora/eventos/crm`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pudo obtener la lista de eventos'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  // FUNCION QUE OBTIENE LA LISTA DE EVENTOS DISPONIBLES A NIVEL DE Agente
  getEventosAgente():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/bitacora/eventos/agente`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pudo obtener la lista de eventos'))
    )
  }
  //------------------------------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------------------------------//
  postBitacora(EventoID:number,Elemento:string,Comentario:string,Intervalo:string):Observable<any>{
    var Usuario:string = sessionStorage.getItem('usuario')||"";
    return this.http.post<any>(`${this.apiUrl}/bitacora/agregar`,{EventoID,Elemento,Comentario,Intervalo,Usuario})
    .pipe(
      tap(),
      catchError(this.handleError<any>('Error al guardar los datos de la bitacora'))
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
