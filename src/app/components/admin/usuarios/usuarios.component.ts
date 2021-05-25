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
      this.usuarios = r;
      console.log(r)
    })    
  }  

  getUsuarios(){
    this.service.getUsuarios().subscribe(res=>{      
      this.usuarios = res;      
    })
  }

  openModalCrear(){
    const dialogRef = this.dialog.open(ModalCrearUsuario,{
      width:'70%',
      data:[]
    });

    dialogRef.afterClosed().subscribe(datos=>{
      if(!datos){return;}
            
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
    private dialog:MatDialog
  ){}  

  roles:any[] = [];

  ngOnInit(): void{
    this.getRoles();
  }

  getRoles(){
    this.service.getRolesUsuarios().subscribe(r=>{
      this.roles = r;
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

}
//------------------------------------------------------------------------------------------------------------//