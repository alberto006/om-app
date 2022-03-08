import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import {tap,catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  api = environment.api81;
  llave_privada = environment.crypto_js_key

  constructor(private http:HttpClient, private snackbar:MatSnackBar) { }

  getCategorias():Observable<any>{
    return this.http.get(`${this.api}/om/tickets/categorias`)
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pueden obtener la lista de categorias'))
    )
  }

  getEncripted(message:string):Observable<any>{    
    return this.http.post(`${this.api}/om/tickets/encripted`,{message})
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se puede obtener la respuesta del servidor'))
    )
  }

  getDecripted(message:string):Observable<any>{    
    return this.http.post(`${this.api}/om/tickets/decripted`,{message})
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se puede obtener la respuesta del servidor'))
    )
  }

  encrypt(message:string){
    return CryptoJS.AES.encrypt(message,this.llave_privada);    
  }

  decrytp(message:string){
    var data =  CryptoJS.AES.decrypt(message,this.llave_privada);
    var respuesta = data.toString(CryptoJS.enc.Utf8);
    return respuesta;
  }

  //--------------------------------------------------------------------------------------------------------//
  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      //console.table(error)
      return of(result as T)
      
    }
  }
  //--------------------------------------------------------------------------------------------------------//

}
