import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntervalosService } from './intervalos.service';

//material table
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-campaing-in-time',
  templateUrl: './campaing-in-time.component.html',
  styleUrls: ['./campaing-in-time.component.css']
})
export class CampaingInTimeComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private intervaloService: IntervalosService, public dialog: MatDialog) { }

  data: any = [];
  listaCrms: any = [];
  fecha: string = "";
  crmSelected: number = 0;

  //variables para la tabla
  displayColumns: string[] = ['INTERVALO', 'AGENTES', 'INTENTOS', 'CONTACTOS', 'RPC','BITACORA'];
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

  getDate(): string {
    //FECHA ACTUAL
    var d = new Date();
    var mes = '' + (d.getMonth() + 1)
    var dia = '' + d.getDate()
    var anio = '' + d.getFullYear();

    if (mes.length < 2) {
      mes = '0' + mes
    }
    if (dia.length < 2) {

      dia = '0' + dia
      dia;
    }

    var date = anio + mes + dia
    return date;
  }

  ngOnInit(): void {
    this.getCrms();    
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  export(id: number): void {
    if (this.crmSelected > 0) {
      var tempCrm = "00000" + id;
      var crm = tempCrm.substring(tempCrm.length - 4, tempCrm.length)

      var date = this.getDate();

      window.open(`http://10.8.8.81:1880/api/neotel/intervalos/${crm}/${id}/${date}/data_intervalo.csv`, '_blank');

    } else {
      this.notificacion("Debe Seleccionar un CRM");
    }
  }
  exportAgentes(): void {
    if (this.crmSelected > 0) {
      var tempCrm = "00000" + this.crmSelected;
      var crm = tempCrm.substring(tempCrm.length - 4, tempCrm.length)

      var date = this.getDate();

      window.open(`http://10.8.8.81:1880/api/neotel/exportar-agentes/${crm}/${this.crmSelected}/${date}/data_agentes.xls`, '_blank');

    } else {
      this.notificacion("Debe Seleccionar un CRM");
    }
  }


  selectCrm(id: number) {
    this.crmSelected = id;
    var tempCrm = "00000" + id;
    var crm = tempCrm.substring(tempCrm.length - 4, tempCrm.length)
    var date = this.getDate();
    this.getData(crm, id, date);
  }

  getData(crm: string, ncrm: number, date: string) {
    this.intervaloService.getIntervaloData(crm, ncrm, date).subscribe(res => {
      this.data = res;
      this.dataSource.data = this.data;
    })
  }

  getAgentes() {
    if (this.crmSelected != 0) {
      var tempCrm = "00000" + this.crmSelected;
      var crm = tempCrm.substring(tempCrm.length - 4, tempCrm.length);
      var date = this.getDate();
      this.intervaloService.getAgentesData(crm, this.crmSelected, date).subscribe((res) => {

        const dialogRef = this.dialog.open(ModalListaAgentes,{
          width:'90%',
          data:res,
          maxHeight:'100%',
          autoFocus:false,          
        });

        dialogRef.afterClosed().subscribe(result=>{
          if(!result){return;}
        })
        
      })
    }else{
      this.notificacion("No hay un CRM seleccionado!");
    }
  }

  getCrms() {
    this.intervaloService.getListaCrms().subscribe(res => {
      this.listaCrms = res;
      
    })
  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }

  openBitacoraCRM(data:any){
    const dialogRef = this.dialog.open(ModalBitacoraCrm,{
      width:"80%",
      data:data
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(!result){return;}
    })
  }

}

interface agentes{
  AGENTE: string,
  CONTACTOS:string,
  RPC:string,
  PRIMER_CONTACTO:string,
  ULTIMO_CONTACTO:string
}


//------------------------------------------------------------------------------------------------------------//
// COMPONENTE PARA DIALOGO DE LISTADO DE AGENTES
@Component({
  selector:'modal-lista-agentes',
  templateUrl:'modal-lista-agentes.html',
  styleUrls:['campaing-in-time.component.css']
})
export class ModalListaAgentes implements OnInit{

  constructor(
    public dialogRef:MatDialogRef<ModalListaAgentes>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private intervaloService:IntervalosService,
    private dialog:MatDialog
  ){}

  DataAgentes:agentes = this.data;
  displayColumns: string[] = ['AGENTE','CONTACTOS','RPC','PRIMER_CONTACTO','ULTIMO_CONTACTO','BITACORA'];
  
  

  dataSource:MatTableDataSource<agentes> = this.data;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  filtrar(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltrado.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit():void{
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openBitacoraAgente(data:any){
    const dialogRef = this.dialog.open(ModalBitacoraAgente,{
      width:"80%",
      data:data
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(!result){return;}
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

}
//------------------------------------------------------------------------------------------------------------//

//------------------------------------------------------------------------------------------------------------//
// COMPONENTE PARA BITACORA DE EVENTOS A NIVEL CRM
@Component({
  selector:'modal-bitacora-crm',
  templateUrl:'modal-bitacora-crm.html',
  styleUrls:['campaing-in-time.component.css']
})
export class ModalBitacoraCrm implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalBitacoraCrm>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private intervalosService:IntervalosService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit():void{
    this.eventosCrm();
  }

  listaEventos:any;
  eventoSeleccionado:string="";
  comentario:string="";
  usuarioBitacora:string = sessionStorage.getItem('usuario')||"";

  eventoSelected(evento:number):void{
    
    this.listaEventos.map((x:any)=>{
      if(x.EVENTOID == evento){
        this.eventoSeleccionado = x.DESCRIPCION
        
      }
    })
    console.log(this.eventoSeleccionado)
  }

  comentarioSet(comment:string):void{
    this.comentario = comment
  }  

  eventosCrm():void{
    this.intervalosService.getEventosCrm().subscribe(r=>{
      this.listaEventos = r;
      
    })
  }

  agregarIncidente(EventoID:number,Elemento:string,Comentario:string,Intervalo:string){    
    Elemento = 'CRM '+Elemento;
    this.intervalosService.postBitacora(EventoID,Elemento,Comentario,Intervalo).subscribe(resultado=>{
      if(resultado[0].STATUS == "1"){ 
        this.notificacion("Incidente agregado con exito!")
        this.dialogRef.close();
      }else{
        console.log(resultado)
        this.notificacion(resultado[0].MESSAGE)
      }
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
}
//------------------------------------------------------------------------------------------------------------//


//------------------------------------------------------------------------------------------------------------//
// COMPONENTE PARA BITACORA DE EVENTOS A NIVEL DE AGENTE
@Component({
  selector:'modal-bitacora-agente',
  templateUrl:'modal-bitacora-agente.html',
  styleUrls:['campaing-in-time.component.css']
})
export class ModalBitacoraAgente implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalBitacoraAgente>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private intervalosService:IntervalosService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit():void{
    this.eventosAgente();
    this.intervalo = this.getIntervalo();    
  }

  listaEventos:any;
  eventoSeleccionado:string="";
  comentario:string="";
  usuarioBitacora:string = sessionStorage.getItem('usuario')||"";

  intervalo:string ="";

  getIntervalo():string{
    var fecha = new Date()
    var hora = fecha.getHours()   

    var minuto = fecha.getMinutes()
    var intervalo:string = ""
    if(minuto<30){
      intervalo = hora+":00";
    }else{
      intervalo = hora+':30'
    }    
    return intervalo;
  }

  eventoSelected(evento:number):void{    
    this.listaEventos.map((x:any)=>{
      if(x.EVENTOID == evento){
        this.eventoSeleccionado = x.DESCRIPCION
        
      }
    })
    console.log(this.eventoSeleccionado)
    
  }

  comentarioSet(comment:string):void{
    this.comentario = comment
  }  

  eventosAgente():void{
    this.intervalosService.getEventosAgente().subscribe(r=>{
      this.listaEventos = r;
      
    })
  }

  agregarIncidente(EventoID:number,Elemento:string,Comentario:string,Intervalo:string){    
    
    this.intervalosService.postBitacora(EventoID,Elemento,Comentario,Intervalo).subscribe(resultado=>{
      if(resultado[0].STATUS == "1"){ 
        this.notificacion("Incidente agregado con exito!")
        this.dialogRef.close();
      }else{
        console.log(resultado)
        this.notificacion(resultado[0].MESSAGE)
      }
    })
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
}
//------------------------------------------------------------------------------------------------------------//