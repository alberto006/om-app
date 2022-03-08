import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { RapiwhaService } from './rapiwha.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-rapiwha-blaster',
  templateUrl: './rapiwha-blaster.component.html',
  styleUrls: ['./rapiwha-blaster.component.css']
})
export class RapiwhaBlasterComponent implements OnInit {

  constructor(private service:RapiwhaService, private snack:MatSnackBar, private dialog:MatDialog) { }
  

  telefono:string="";
  mensaje:string="";
  log:string ="";
  
  dataSource = []
  columnas:string[] = ["TELEFONO","APIKEY","FECHA_ACTUALIZACION","OPCIONES"]

  ngOnInit(): void {
    this.service.getTelefonos().subscribe(r=>{
      this.dataSource = r      
    })
  }

  send(){

    if(this.telefono==""){
      this.snack.open("El telefono no puede estar en blanco","Cerrar",{
        duration:5000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
      return;
    }

    if(this.mensaje==""){
      this.snack.open("El mensaje no puede estar en blanco","Cerrar",{
        duration:5000,
        horizontalPosition:'center',
        verticalPosition:'top'
      })
      return;
    }

    this.service.sendMessage(this.telefono,this.mensaje).subscribe(r=>{
      this.log = r
    })
  }

  //--------------------------------------------------------------------------------//
  openModalAddKey():void{
    const dialog = this.dialog.open(ModalRapiwhaAddKey,{
      width:'50%',       
    })

    dialog.afterClosed().subscribe(data=>{
      this.service.getTelefonos().subscribe(r=>{
        this.dataSource =r
      })
    })
  }
  //--------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------//
  openModalEditKey(data:any):void{
    const dialog = this.dialog.open(ModalRapiwhaEditKey,{
      width:'90%', 
      maxHeight:'90vh',     
      data:data
    })

    dialog.afterClosed().subscribe(data=>{
      
    })

    
  }
  //--------------------------------------------------------------------------------//


}

//--------------------------------------------------------------------------------//
//MODAL PARA AGREGAR UN API KEY
@Component({
  selector:'modal-rapiwha-add-key',
  templateUrl:'./modal-rapiwha-add-key.html',
  styleUrls:['./rapiwha-blaster.component.css']
})
export class ModalRapiwhaAddKey implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalRapiwhaAddKey>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snackBar: MatSnackBar,
    private service:RapiwhaService
  ){}

  telefono:string=""
  apikey:string=""

  log:string = ""

  ngOnInit(): void {
      
  }

  Agregar():void{
    this.service.addApiKey(this.telefono,this.apikey).subscribe(r=>{
      this.log = JSON.stringify(r)
      console.log(r)
      if(r[0].STATUS=="1"){
        this.snackBar.open("Se agrego el registro",'Cerrar',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
        this.service.getTelefonos().subscribe(r=>{
          this.data = r
        })
        this.onNoClick()

      }else{
        this.snackBar.open("No se pudo agregar el registro",'Cerrar',{
          duration:5000,
          verticalPosition:'top',
          horizontalPosition:'center'
        })
      }
    })
  }

  onNoClick():void{
    this.dialogRef.close()
  }


}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//MODAL DE EDICION DE API KEY
@Component({
  selector:'modal-rapiwha-editar-apikey',
  templateUrl:'./modal-rapiwha-editar-apikey.html',
  styleUrls:['./rapiwha-blaster.component.css']

})
export class ModalRapiwhaEditKey implements OnInit{
  constructor(
    private dialogRef:MatDialogRef<ModalRapiwhaEditKey>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private service:RapiwhaService,
    private snackbar:MatSnackBar
  ){}

  apikey=this.data.APIKEY
  telefono=this.data.TELEFONO
  fecha_actualizacion=this.data.FECHA_ACTUALIZACION
  usuarioid = this.data.USUARIOID
  credito = 0
  TotalMensajes:number = 0
  
  //propiedades para la tabla de mensajes  
  mensajes!:MatTableDataSource<any>;
  columnas:string[] = ["id","from","type","text","process_date"]

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  filtrar(event: Event){
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.mensajes.filter = valorFiltrado.trim().toLocaleLowerCase();
    if(this.mensajes.paginator){
      this.mensajes.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.service.viewCredit(this.apikey).subscribe(r=>{
      this.credito = r.credit      
    })    
    
    this.service.getNewMessages(this.apikey).subscribe(r=>{
      this.mensajes = new MatTableDataSource(r);
      this.mensajes.sort = this.sort;
      this.mensajes.paginator = this.paginator      
      this.TotalMensajes = r.length
    })

  }

  getAllMessages():void{
    this.service.getAllMessages(this.apikey).subscribe(r=>{
      this.mensajes = new MatTableDataSource(r);
      this.mensajes.sort = this.sort;
      this.mensajes.paginator = this.paginator      
      this.TotalMensajes = r.length
    })
  }

  onNoClick():void{
    this.dialogRef.close()
  }
  


}

//--------------------------------------------------------------------------------//