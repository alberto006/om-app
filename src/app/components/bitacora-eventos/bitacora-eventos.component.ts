import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EventosService } from './eventos.service';



@Component({
  selector: 'app-bitacora-eventos',
  templateUrl: './bitacora-eventos.component.html',
  styleUrls: ['./bitacora-eventos.component.css']
})
export class BitacoraEventosComponent implements OnInit {

  constructor(
    private service:EventosService, 
    private _snackBar:MatSnackBar, 
    private dialog:MatDialog) { }

  Categorias:any = [];
  Eventos:any = [];
  Removable=false;

  ngOnInit(): void {
    this.service.getListaCategorias().subscribe(r=>{
      this.Categorias = r      
    })

    this.service.getListaEventos().subscribe(r=>{
      this.Eventos = r      
    })  

    if(window.screen.width < 1000){
      this.Removable = true
    }
    
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

  openModalAgregar(data:any){
    const dialogRef = this.dialog.open(ModalEventoAgregar,{
      width:'90%',
      data:data
    })

    dialogRef.afterClosed().subscribe(result=>{
      if(!result){return}
    })
  }

}



@Component({
  selector:'modal-evento-agregar',
  templateUrl:'./modal-evento-agregar.html',
  styleUrls:['./bitacora-eventos.component.css']
})
export class ModalEventoAgregar implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalEventoAgregar>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:EventosService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit():void{

  }

  onNoClick():void{
    this.dialogRef.close
  }
}

