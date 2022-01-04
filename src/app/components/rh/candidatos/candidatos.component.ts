import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { CandidatosService } from './candidatos.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCard } from '@angular/material/card';


@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit{

  constructor(
    private service:CandidatosService, 
    private _snackBar: MatSnackBar,
    private dialog:MatDialog
    ) { }


  
  displayColumns: string[] = ["nombre","identidad","telefono_celular","correo","genero","nivel_academico","profesion","fecha_creacion","Opciones"];

  listaCandidatos:any[] = [];
  dataSource!: MatTableDataSource<any>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtrar(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  ngOnInit(): void {
    this.service.getCandidatos().subscribe(res=>{

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.listaCandidatos = res;
      
    })
    
  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      
    })
  }

  verPerfil(id:number){
    const dialog = this.dialog.open(ModalCandidatoPerfil,{
      width:'80%',
      maxHeight: '90vh',
      data:id
    })

    dialog.afterClosed().subscribe(data=>{
      if(!id){return}
      
      
    })
  }


}


@Component({
  selector:'modal-candidato-perfil',
  templateUrl:'./modal-candidato-perfil.html',
  styleUrls:['./candidatos.component.css']
})
export class ModalCandidatoPerfil implements OnInit{

  constructor(
    public dialogRef:MatDialogRef<ModalCandidatoPerfil>,
    @Inject(MAT_DIALOG_DATA) public id:any,
    private service:CandidatosService,
    private _snackBar:MatSnackBar
  ){}

  candidatoElements:string[] = [];

  ngOnInit(): void {
      this.service.getCandidatoByID(this.id).subscribe(r=>{
        this.candidatoElements = r
      })
      
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  download(){
    window.open("http://10.8.8.81/rh/?id="+this.id);
  }
}
