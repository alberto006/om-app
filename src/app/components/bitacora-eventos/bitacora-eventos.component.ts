import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  updateData():void{
    this.service.getListaCategorias().subscribe(r=>{
      this.Categorias = r      
    })    
    this.service.getListaEventos().subscribe(r=>{
      this.Eventos = r      
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
    const dialogRef = this.dialog.open(ModalEventoAgregar,{
      width:'70%',
      data:this.Categorias,
      panelClass:[''],      
    })

    dialogRef.afterClosed().subscribe(datos=>{
      if(!datos){return}
      this.service.postEvento(datos.categoriaID,datos.evento,datos.descripcion).subscribe(r=>{
        this.notificacion('Evento agregado con exito')
        this.updateData();        
      })
    })
  }

  openModalEditar(data:any){
    const dialog =this.dialog.open(ModalEventoEditar,{
      width:'70%',
      data:data,      
    })

    dialog.afterClosed().subscribe(dato=>{
      if(!dato){return}     

      var visible = (data.VISIBLE == true)?1:0;
      
      console.log(dato)
      this.service.editEvento(dato.EVENTOID,dato.CATEGORIAID,dato.EVENTO,dato.DESCRIPCION,visible).subscribe(res=>{
        console.log(res)
        this.notificacion("Evento actualizado con exito");      
        //this.updateData()        
      });

      
    })
  }

  notificacion(mensaje:string){
    this._snackBar.open(mensaje,'cerrar',{
      duration:5000,
      horizontalPosition:'end',
      verticalPosition:'top'
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


@Component({
  selector:'modal-evento-editar',
  templateUrl:'modal-evento-editar.html',
  styleUrls:['./bitacora-eventos.component.css']
})
export class ModalEventoEditar implements OnInit {
  constructor(
    public dialogRef:MatDialogRef<ModalEventoEditar>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:EventosService,    
  ){}

  categorias:any = [];

  ngOnInit():void{
    this.service.getListaCategorias().subscribe(r=>{
      this.categorias = r;          
    })

    
  }  

  onNoClick():void{
    this.dialogRef.close
  }
}
