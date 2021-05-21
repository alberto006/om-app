import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private _snackBar:MatSnackBar) { }

  apiUrl = environment.apiUrl;

  //------------------------------------------------------------------------------------------------------------//
  getUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/om/usuarios`)
  }
  //------------------------------------------------------------------------------------------------------------//



}
