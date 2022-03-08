import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private service:AuthService){}


  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state: RouterStateSnapshot):boolean
  {
      /*if(this.isLoggedIn()){
        return true;        
      }*/

      var componente  = route.url[0].path
      var token = sessionStorage.getItem('token')||"";
      var permisos = this.service.decrypt(token);
      
      var access = false

      permisos.map((x:any)=>{
        if(x.COMPONENTE == componente){
          access = true;
        }
      })      

      if(access){
        return true;
      }

      if(this.isLoggedIn() && !access){
        this.router.navigate(['./acceso-denegado'])
        return false;
      }      
      
      this.router.navigate(['./login']);
      return false;
  }

  public isLoggedIn():boolean{
    let status = false;
    if(sessionStorage.getItem('isLoggedIn') == "true"){
      status = true;
    }else{
      status = false;
    }
    return status
  }

 

  
  
}