import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {UsuarioService} from './usuario.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
<<<<<<< HEAD
      this.usuarios = r;      
=======
      this.usuarios = r;
      console.log(r)
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
    })    
  }  

  getUsuarios(){
    this.service.getUsuarios().subscribe(res=>{      
      this.usuarios = res;      
    })
  }

<<<<<<< HEAD
  actualizarTablaUsuarios():void{
    
    this.getUsuarios();
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
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
=======
  openModalCrear(){
    const dialogRef = this.dialog.open(ModalCrearUsuario,{
      width:'70%',
      data:[]
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
    });

    dialogRef.afterClosed().subscribe(datos=>{
      if(!datos){return;}
<<<<<<< HEAD
      this.notificacion("Usuario actualizado");
      this.usuarios = datos;
      this.actualizarTablaUsuarios()
    })
  }

  openModalCrearRol(){
    const dialogRef = this.dialog.open(ModalCrearRol,{
      width:'70%',
      data:[],
      disableClose:true
    })

    dialogRef.afterClosed().subscribe(r=>{
      if(!r){return;}

    })
  }

  notificacion(mensaje:string,tipo:string=""){
    this._snackBar.open(mensaje,"Cerrar",{
      duration:10000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['alert',`alert-${tipo}`]
    })
=======
            
    })

>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
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
<<<<<<< HEAD
    private dialog:MatDialog,
    private _snackBar:MatSnackBar
=======
    private dialog:MatDialog
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
  ){}  

  roles:any[] = [];

  ngOnInit(): void{
    this.getRoles();
  }

<<<<<<< HEAD
  guardar(data:any){           
    if(data.rolID=="" || data.rolID == undefined){ 
      this.notificacion("Debe seleccionar un rol de usuario","warning");return; 
    }   
    if(data.usuario=="" || data.usuario == undefined){ 
      this.notificacion("Debe ingresar un nombre de usuario","warning"); return;
    }   
    if(data.password=="" || data.password == undefined){ 
      this.notificacion("Debe ingresar la clave" ,"warning"); return;
    }
    if(data.correo=="" || data.correo == undefined){ 
      this.notificacion("Debe ingresar un correo electronico","warning");return;
    }

    this.service.postUsuario(data.usuario,data.correo,data.rolID,data.password).subscribe(r=>{
      if(r.length>=1){
        this.notificacion("Usuario "+data.usuario+" creado con exito!")
      }else{
        this.notificacion("No se puede crear el usuario en el sistema")              }    
      
      this.dialogRef.close(r);
    })
    
  }

=======
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.roles = r;
    })
  }

<<<<<<< HEAD
  notificacion(mensaje:string,tipo:string=""){
    this._snackBar.open(mensaje,"Cerrar",{
      duration:10000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass: ['alert',`alert-${tipo}`]
    })
  }

=======
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
  onNoClick():void{
    this.dialogRef.close();
  }

}
<<<<<<< HEAD
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
  
  claveNueva:string="";
  claveNuevaConfirm:string="";
  cambiarClave:boolean = false;
  

  ngOnInit():void{
    this.getRoles();    
  }

  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.roles = r;          
    })
  }

  guardar(data:any){
    var cambio_pass:number = (this.cambiarClave == true)?1:0;
    
    if(this.cambiarClave == true && this.claveNueva != this.claveNuevaConfirm){
      this.notificacion("Las claves no coinciden");
      return;
    }

    var isActivo = (data.ACTIVO == true)?1:0;
    
    this.service.updateUsuario(data.USUARIOID,data.USUARIO,data.CORREO,isActivo,data.ROLID,this.claveNueva,cambio_pass).subscribe(res=>{
      this.dialogRef.close(res);
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
    this.dialogRef.close()
  }

}
//------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//
//COMPONENTE PARA CREAR UN NUEVO ROL
@Component({
  selector:'modal-crear-rol',
  templateUrl:'./modal-crear-rol.html',
  styleUrls:['./usuarios.component.css']
})
export class ModalCrearRol implements OnInit{

  constructor(
    public dialogRef:MatDialogRef<ModalCrearRol>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:UsuarioService,
    private _snackBar:MatSnackBar
  ){}

  Roles:any[] = [];
  NuevoRol:string = ""

  ngOnInit():void{ 
    this.getRoles();
  }

  CrearRol(){
    
    if(this.NuevoRol == ""){
      this.notificacion("Debe ingresar el nombre del Rol")
      return;
    }

    if(this.Roles.filter(item => item.ROL == this.NuevoRol.toUpperCase()).length > 0){
      this.notificacion("El rol ya existe no se puede ingresar un duplicado")
      return;
    }

    this.NuevoRol = this.NuevoRol.trim();
    this.service.postRol(this.NuevoRol).subscribe(r=>{
      this.notificacion('Rol creado con exito!')
      this.NuevoRol = "";
      this.getRoles();
    })
  }

  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.Roles = r;
      
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  notificacion(mensaje:string){
    this._snackBar.open(mensaje,'Cerrar',{
      duration:5000,
      verticalPosition:'top',
      horizontalPosition:'center'
    })
  }

}
=======
>>>>>>> 1054061fe25cde8f3c36c20938f3b319fb5987e6
//------------------------------------------------------------------------------------------------------------//