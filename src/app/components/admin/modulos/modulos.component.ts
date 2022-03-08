import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModulosService } from '../../modulos/modulos.service';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  modulos:any[] = [];
  componentes:any[]=[];
  Removable=false;

  // tslint:disable-next-line:variable-name
  constructor(private service: ModulosService, private _snackBac: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.service.getModulos().subscribe(r=>{
      this.modulos = r
    })

    this.service.geComponents().subscribe(r=>{
      this.componentes = r
    })
  }

  getModulos(){
    this.service.getModulos().subscribe(r=>{
      this.modulos = r
    })
  }

  getComponents(){
    this.service.geComponents().subscribe(r=>{
      this.componentes = r
    })
  }

  @HostListener("window:resize",[]) onResize(){
    var width = window.innerWidth;
    if(width<1000){
      this.Removable = true;
    }else{
      this.Removable = false;
    }
  }

  @HostListener("window:load",[]) onLoad(){
    var width = window.innerWidth;
    if(width<1000){
      this.Removable = true;
    }else{
      this.Removable = false;
    }
  }

  openModalAgregar(){

  }

  openModalEditar(data:any){
    const dialogRef = this.dialog.open(ModalPermisosComponente,{
      width:'90%',
      data:data,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(r=>{

    })

  }

}

//------------------------------------------------------------------------------------------------------------//
//COMPONENTE PARA CREAR UN NUEVO MODULO

@Component({
  selector:'modal-permisos-componente',
  templateUrl:'./modal-permisos-componente.html',
  styleUrls:['./modulos.component.css']
})
export class ModalPermisosComponente implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<ModalPermisosComponente>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:ModulosService,
    private _snackBar:MatSnackBar
  ){}

  permisos:any[] = [];
  roles:any[] = [];
  rolesDisponibles:any[] = [];

  ngOnInit():void{

    console.log(this.data)

    this.service.getPermisosComponente(this.data.COMPONENTEID).subscribe(r=>{
      this.permisos = r
    })

    this.service.getRoles().subscribe(r=>{
      this.roles = r;
      this.roles.map((rol:any)=>{
        var temp = this.permisos.filter(permiso => permiso.ROL == rol.ROL)
        if(temp.length<1){
          this.rolesDisponibles.push(rol);
        }
      })

    })

  }

  asignarPermiso(componenteID:number,rolID:number):void{
    this.service.postPermiso(componenteID,rolID).subscribe(r=>{
      this.getPermisos()
      this.notificacion('Permiso agregado')
    })
  }

  removerPermiso(componenteID:number,rolID:number):void{
    this.service.deletePermiso(componenteID,rolID).subscribe(r=>{
      this.getPermisos()
      this.notificacion('Permiso removido')
    })
  }

  getPermisos(){
    this.service.getPermisosComponente(this.data.COMPONENTEID).subscribe(r=>{
      this.permisos = r
      this.rolesDisponibles = [];
      this.roles.map((rol:any)=>{
        var temp = this.permisos.filter(permiso => permiso.ROL == rol.ROL)
        if(temp.length<1){
          this.rolesDisponibles.push(rol);
        }
      })
    })
  }

  onNoClick(){
    this.dialogRef.close()
  }

  notificacion(mensaje:string):void{
    this._snackBar.open(mensaje,'Cerrar',{
      duration:5000,
      verticalPosition:'top',
      horizontalPosition:'center'
    })
  }
}
//------------------------------------------------------------------------------------------------------------//
