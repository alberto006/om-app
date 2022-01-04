import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree,Router} from '@angular/router';
import { Observable } from 'rxjs';

 @Injectable({
     providedIn: 'root'
 })
 export class PermisoGuard implements CanActivate{

    constructor(private router: Router){}

    public Componente:string = "";
    public permisos = sessionStorage.getItem("permisos")||[];
    

    canActivate(
        router:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):boolean{
        return false;
    }

    public validatePertmisos():boolean{
        var autorizado:boolean = false;
        if(this.Componente==""){
            autorizado = false;
        }
        else if(this.Componente == "public"){
            return true;
        }else{

            

        }

        return autorizado;
        
    }



 }