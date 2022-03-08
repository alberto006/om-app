import { Component, OnInit, ViewChild } from '@angular/core';
import { RapiwhaService } from '../rapiwha.service';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalCreateListComponent } from './modal-create-list/modal-create-list.component';


@Component({
  selector: 'app-listas-rpw',
  templateUrl: './listas-rpw.component.html',
  styleUrls: ['./listas-rpw.component.css']
})
export class ListasRpwComponent implements OnInit {

  constructor(
    private service:RapiwhaService,
    private snack:MatSnackBar,
    private dialog:MatDialog
  ) { }

  Listas!:MatTableDataSource<any> 
  

  columnas:string[] = ["NOMBRE","FECHA_PROGRAMADA","TOTAL","ENVIADOS","PENDIENTES","OPCIONES"];

  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  filtrar($event: Event){
    const filtro = (event?.target as HTMLInputElement).value;
    
    this.Listas.filter = filtro.trim().toLocaleLowerCase();
    if(this.Listas.paginator){
      this.Listas.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.service.getListas().subscribe(r=>{
      this.Listas = new MatTableDataSource(r)
      this.Listas.sort = this.sort
      this.Listas.paginator = this.paginator
      console.log(r)
    })   
  }

  obtenerListas():void{
    this.service.getListas().subscribe(r=>{
      this.Listas = new MatTableDataSource(r)
      this.Listas.sort = this.sort
      this.Listas.paginator = this.paginator
      console.log(r)
    })
  }

  openMdoalCrearLista(){
    const dialog = this.dialog.open(ModalCreateListComponent,{
      width:'90%',
      maxHeight:'90vh'
    })
    dialog.afterClosed().subscribe(data=>{
      
    })
  }

}
