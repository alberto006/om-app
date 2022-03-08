import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  

  usuario = new FormControl('');
  password = new FormControl('');
  permisos:string[] = [];
  loginSatus:boolean=false;

  constructor(
    private authService:AuthService, 
    private http:HttpClient,
    private _snackBar:MatSnackBar,
    private router:Router    
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('isLoggedIn')=="true"){      
      this.router.navigate(['./inicio'])
    }
  }
  

  login(usuario:string,password:string):void{
    var state:boolean = false;
     this.authService.login(usuario,password).subscribe(res=>{
      if(res[0].STATUS == 1){
        sessionStorage.setItem('isLoggedIn','true');
        //sessionStorage.setItem('token','pruebatoken');
        sessionStorage.setItem('usuario',usuario);
        
        
        this.notificacion("Bienvenido "+usuario)
        this.loginSatus = true;
        

        this.authService.getPermisos(usuario).subscribe(r=>{
          this.permisos = r;
          
          sessionStorage.setItem('token',this.authService.encrypt(this.permisos));

          sessionStorage.setItem('permisos',JSON.stringify(this.permisos))
          window.location.href="./"
        })

        //this.router.navigate(['./inicio']);     

      }else{               
        this.notificacion(res[0].MESSAGE)
      }      
    })   
    
  }  

  notificacion(mensaje:string){
    this._snackBar.open(mensaje, 'Cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
    })
  }

}
