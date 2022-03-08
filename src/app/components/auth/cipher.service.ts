import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import {Observable, of, from} from 'rxjs'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn:'root'
})
export class CipherService{

    constructor (){}

    llave_privada = environment.crypto_js_key; 

    encrypt(message:string){
        return CryptoJS.AES.encrypt(message,this.llave_privada);    
    }

    decrytp(message:string){
        var data =  CryptoJS.AES.decrypt(message,this.llave_privada);
        var respuesta = data.toString(CryptoJS.enc.Utf8);
        return respuesta;
    }

}