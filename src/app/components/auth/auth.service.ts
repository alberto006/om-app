import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import {Observable, of, from} from 'rxjs'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private _snackBar:MatSnackBar) { }
  

  //apiUrl = 'http://10.8.8.81:1880/api/neotel';
  //apiUrl = 'api/neotel';
  apiUrl = environment.apiUrl;

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Credentials': 'true',
    })
  }   

  get jsonFormatter():any {
    return {
      stringify: (cipherParams: any) => {
        const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: null, s: null };
        if (cipherParams.iv) {
          jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
          jsonObj.s = cipherParams.salt.toString();
        }
        return JSON.stringify(jsonObj);
      },
      parse: (jsonStr:any) => {
        const jsonObj = JSON.parse(jsonStr);
        // extract ciphertext from json object, and create cipher params object
        const cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        if (jsonObj.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }
        return cipherParams;
      }
    };
  }

  encrypt(value: any) {
    const key =  environment.crypto_js_key; // SECRET KEY FOR ENCRYPTION 
    value = value instanceof String ? value : JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(value,key, 
      { format: this.jsonFormatter, mode: CryptoJS.mode.CBC }).toString();
    return encrypted;
  }


  decrypt(value: any): any {
    const key = environment.crypto_js_key; //SECRET KEY FOR ENCRYPTION
    const decrypted = CryptoJS.AES.decrypt(value, key, {format: this.jsonFormatter }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

  login(usuario:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/om-login`,{usuario,password})
    .pipe(
      tap(),
      catchError(this.handleError<any>('No se pudieron obtener los datos de usuario'))
    )
  }

  logout():void{
    sessionStorage.setItem('isLoggedIn','false');
    sessionStorage.removeItem('usuario')
    sessionStorage.removeItem('permisos')
    sessionStorage.removeItem('token');    
  }

  checkAcceso(usuario:string,componente:string):Observable<any>{
    //var usuario = sessionStorage.getItem('usuario')||"";
    return this.http.post<any>(`${this.apiUrl}/checkaccess`,{usuario,componente})
    .pipe(
      tap(),
      catchError(this.handleError<any>("No se puede validar el permiso del usuario"))
    )
  }

  getPermisos(usuario:string){
    return this.http.get<any>(`${this.apiUrl}/permisos/${usuario}`).
    pipe(
      tap(),
      catchError(this.handleError<any>('No se pudieron obtener los datos de permisos'))
    )
  }

  notificacion(mensaje:string){
    this._snackBar.open(mensaje, 'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }  
  

  private handleError<T>(operation = 'operation',result?:T){
    return (error:any):Observable<T>=>{
      console.log('Error en la aplicacion'+JSON.stringify(error));
      this.notificacion('Error en la aplicacion: '+operation)
      return of(result as T);
    }
  }
  
}
