import { Component, OnInit, ViewChild, AfterViewInit, Inject, AfterContentInit  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReclutamientoService } from './reclutamiento.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['./reclutamiento.component.css']
})
export class ReclutamientoComponent implements OnInit ,AfterViewInit  {
  listaCandidatos:any[] = [];
  displayColumns: string[] = ["nombre","identidad","telefono_celular","correo","nivel_academico","profesion","fecha_creacion","Opciones"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.listaCandidatos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  FechaInicio:string="";
  FechaFin:string="";

  
  generateDays(){
    var today = new Date();
    var fecha1 = new Date(today.getFullYear(), today.getMonth(), 1 );
    this.FechaInicio = fecha1.toISOString().substring(0, 10);
    var fecha2 = new Date(today.getFullYear(), today.getMonth() + 1, 0 )

    this.FechaFin = fecha2.toISOString().substring(0, 10);
    console.log(this.FechaFin)

    
  }

  constructor(
    private service:ReclutamientoService,
    private snackbar:MatSnackBar,
    private dialog:MatDialog,
    
    ) {      
      this.dataSource = new MatTableDataSource(this.listaCandidatos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
     }

    filtrar(event: Event) {
      const valorFiltrado = (event.target as HTMLInputElement).value;
      this.dataSource.filter = valorFiltrado.trim().toLocaleLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  

  ngOnInit(): void {
    this.service.getCandidatos("2021","12").subscribe(r=>{
      this.listaCandidatos = r
      this.dataSource = new MatTableDataSource(this.listaCandidatos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.generateDays()
    })
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.listaCandidatos)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCandidatos():void{
    if(this.FechaInicio == ""){
      this.notificacion("Debe seleccionar una fecha de inicio");
      return;
    }
    if(this.FechaFin == ""){
      this.notificacion("Debe seleccionar una fecha final");
      return;
    }
    this.service.getCandidatos(this.FechaInicio,this.FechaFin).subscribe(r=>{
      this.listaCandidatos = r
      this.dataSource = new MatTableDataSource<any>(this.listaCandidatos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  notificacion(mensaje: string) {
    this.snackbar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      
    })
  }

  verPerfil(id:string):void{
    const dialog = this.dialog.open(ModalPerfilCandidato,{
      width:'90%',
      maxHeight:'90vh',
      data:id
    })

    dialog.afterClosed().subscribe(data=>{
      if(!id){return}
    })
  }

}

@Component({
  selector: 'modal-perfil-candidato',
  templateUrl: './modal-perfil-candidato.html',
  styleUrls:['./reclutamiento.component.css']
})
export class ModalPerfilCandidato implements OnInit{
  constructor(
    public dialogRef:MatDialogRef<ModalPerfilCandidato>,
    @Inject(MAT_DIALOG_DATA) public id:any,
    private service:ReclutamientoService,
    private snackbar:MatSnackBar,
    private sanitizer: DomSanitizer
  ){}

  perfil:any;
  loaded:boolean = false;
  edad:number = 0
  archivo:any

  
  
  
  ngOnInit():void{
    this.service.getCandidatoById(this.id).subscribe(r=>{
      this.perfil = r[0]    
      this.loaded = true
      this.edad = this.calculateAge(r[0].fecha_nacimiendo)
      this.archivo = this.sanitizer.bypassSecurityTrustUrl(r[0].cv_data)
      console.log(this.archivo)  
    })    
  }



  /* Calcular edad */
  calculateAge(dateString:string) { // a date on string "22/10/1988
    let age: number = 0;

    var dateObject = new Date(dateString);

    //console.log(dateObject);
    
    if (dateString) {
      var timeDiff = Math.abs(Date.now() - new Date(dateObject).getTime());
      age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      //console.log(age);
    }
    return age;
  }

  downloadFile(){
    if(!this.loaded){
      return
    }
    const data = this.perfil.cv_data.replace("data:"+this.perfil.cv_type+";base64,","");
    const byteCharacters = atob(data);
    //console.log(byteCharacters);
    const file = new Blob([byteCharacters], {type:this.perfil.cv_type});
    FileSaver.saveAs(file,this.perfil.cv_name);
    

  } 

  onNoClick():void{
    this.dialogRef.close();
  }
}
