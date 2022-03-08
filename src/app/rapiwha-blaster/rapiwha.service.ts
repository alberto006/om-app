import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CipherService } from '../components/auth/cipher.service';

@Injectable({
  providedIn: 'root'
})
export class RapiwhaService {

  apikey = environment.RWK_1;
  localserver = environment.api81
  

  constructor(private http:HttpClient, private cipher:CipherService, private _snackBar:MatSnackBar) { }

  //---------------------------------------------------------------//
  sendMessage(telefono:string, mensaje:string):Observable<any>{
    
    return this.http.get(`https://panel.rapiwha.com/send_message.php?apikey=${this.apikey}&number=${telefono}&text=${mensaje}`)
    .pipe(
      tap(),
      catchError(this.handleError<any>("No se puede enviar el mensaje de whatsapp"))
    )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  getTelefonos():Observable<any>{
    var usuario = sessionStorage.getItem("usuario")||"";
    var data = {usuario:usuario}
    var payload = this.cipher.encrypt(JSON.stringify(data)).toString();
    
    return this.http.post(`${this.localserver}/rapiwha/telefonos`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError<any>("No se puede obtener la lista de telefonos"))
    )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  addApiKey(telefono:string,apikey:string):Observable<any>{
    
    var usuario = sessionStorage.getItem('usuario')||"";
    var data = {usuario:usuario,telefono:telefono,apikey:apikey};
    var payload = this.cipher.encrypt(JSON.stringify(data)).toString();    
    
    return this.http.post(`${this.localserver}/rapiwha/add/key`,{payload})
      .pipe(
        tap(),
        catchError(this.handleError("No se puede enviar los datos"))
     )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  viewCredit(apikey:string):Observable<any>{
    var data = {apikey:apikey}
    var payload = this.cipher.encrypt(JSON.stringify(data)).toString()
    return this.http.post(`${this.localserver}/rapiwha/ViewCredit`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError('No se puede obtener el credito'))
    )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  getNewMessages(apikey:string):Observable<any>{
    var data = {apikey:apikey}
    var payload = this.cipher.encrypt(JSON.stringify(data)).toString()
    return this.http.post(`${this.localserver}/rapiwha/ViewNewMessages`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("No se pueden obtener los mensajes nuevos"))
    )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  getAllMessages(apikey:string):Observable<any>{
    var data = {apikey:apikey}
    var payload = this.cipher.encrypt(JSON.stringify(data)).toString()
    return this.http.post(`${this.localserver}/rapiwha/ViewAllMessages`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("No se pueden obtener los mensajes nuevos"))
    )
  }
  //---------------------------------------------------------------//

  //---------------------------------------------------------------//
  getListas():Observable<any>{
    var usuario = sessionStorage.getItem('usuario')||"";
    var payload = this.cipher.encrypt(usuario).toString();
    return this.http.post(`${this.localserver}/rapiwha/Listas`,{payload})
    .pipe(
      tap(),
      catchError(this.handleError("Error no se puede obtener la lista de mensajes"))
    )
  }
  //---------------------------------------------------------------//

  private handleError<T>(operation = 'operacion', result?:T){
    return(error:any):Observable<T>=>{
      console.log('Error en la aplicacion: '+JSON.stringify(error));
      console.log(error)
      return of(result as T)      
    }
  }

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
