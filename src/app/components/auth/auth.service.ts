import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import {Observable, of, from} from 'rxjs'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';


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
