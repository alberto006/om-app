import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {UsuarioService} from './usuario.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createOfflineCompileUrlResolver, ThrowStmt } from '@angular/compiler';


interface usuarios{
  USUARIOID:number,
  USUARIO:string,
  CORREO:String,
  ROL:string,
  FECHA_CREACION:string,
  FECHA_MODIFICACION:string,
  ACTIVO:number
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private service:UsuarioService,
    private _snackBar:MatSnackBar,
    public dialog:MatDialog
    ) { }

  usuarios:any = [];  

  displayColumns: string[] = ["USUARIO","CORREO","ROL","FECHA_CREACION","FECHA_MODIFICACION","ACTIVO","OPCIONES"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtrar(event: Event){
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {    
    this.service.getUsuarios().subscribe(r=>{
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
      this.usuarios = r;      
    })    
  }  

  getUsuarios(){
    this.service.getUsuarios().subscribe(res=>{      
      this.usuarios = res;      
    })
  }

  actualizarTablaUsuarios():void{
    console.log(this.usuarios)
    this.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.usuarios)
  }

  openModalCrear(){
    const dialogRef = this.dialog.open(ModalCrearUsuario,{
      width:'70%',
      data:[],
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{
      if(!datos){return;}            
      this.usuarios = datos;
      this.actualizarTablaUsuarios();
    })

  }

  openModalEditar(data:any){
    const dialogRef = this.dialog.open(ModalEditarUsuario,{
      width:'70%',
      data:data,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(datos=>{
      if(!datos){return;}
      console.log(datos)
    })
  }

  notificacion(mensaje:string,tipo:string=""){
    this._snackBar.open(mensaje,"Cerrar",{
      duration:10000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['alert',`alert-${tipo}`]
    })
  }

  editarUsuario(data:any):void{
    console.log(data)
  }  

}

//------------------------------------------------------------------------------------------------------------//
// COMPONENTE PARA CREAR UN NUEVO USUARIO
@Component({
  selector:'modal-crear-usuario',
  templateUrl:'./modal-crear-usuario.html',
  styleUrls:['./usuarios.component.css']
})
export class ModalCrearUsuario implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalCrearUsuario>,
    private service:UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog:MatDialog,
    private _snackBar:MatSnackBar
  ){}  

  roles:any[] = [];

  ngOnInit(): void{
    this.getRoles();
  }

  guardar(data:any){           
    if(data.rolID=="" || data.rolID == undefined){ this.notificacion("Debe seleccionar un rol de usuario","warning");return; }   
    if(data.usuario=="" || data.usuario == undefined){ this.notificacion("Debe ingresar un nombre de usuario","warning"); return;}   
    if(data.password=="" || data.password == undefined){ this.notificacion("Debe ingresar la clave" ,"warning"); return;}
    if(data.correo=="" || data.correo == undefined){ this.notificacion("Debe ingresar un correo electronico","warning");return;}

    this.service.postUsuario(data.usuario,data.correo,data.rolID,data.password).subscribe(r=>{
      if(r.length>=1){
        this.notificacion("Usuario "+data.usuario+" creado con exito!")
      }else{
        this.notificacion("No se puede crear el usuario en el sistema")              }    
      
      this.dialogRef.close(r);
    })
    
  }

  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.roles = r;
    })
  }

  notificacion(mensaje:string,tipo:string=""){
    this._snackBar.open(mensaje,"Cerrar",{
      duration:10000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['alert',`alert-${tipo}`]
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

}
//------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//
// COMPONENTE PARA ACTUALIZAR UN USUARIO
@Component({
  selector:'modal-editar-usuario',
  templateUrl:'./modal-editar-usuario.html',
  styleUrls:['./usuarios.component.css']
})
export class ModalEditarUsuario implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalEditarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:UsuarioService,
    private _snackBar:MatSnackBar    
  ){}

  roles:any[] = [];

  ngOnInit():void{
    this.getRoles();
  }

  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.roles = r;
    })
  }

  guardar(data:any){
    console.log(data)
  }

  onNoClick():void{
    this.dialogRef.close()
  }

}
//------------------------------------------------------------------------------------------------------------//