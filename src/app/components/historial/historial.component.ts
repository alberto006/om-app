import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HistorialService } from './historial.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service:HistorialService) { }

  //displayColumns:string[] = ['FECHA','HORA','AGENTE','COMENTARIOS','ACCION','RESULTADO','TIPIFICACION','SUBTIPIFICACION','TELEFONO','FECHA_AGENDA','FECHA_PROMESA','VALOR_PROMESA'];
  //displayColumns2:string[] = ['FECHA','AGENTE','COMENTARIOS','ACCION','RESULTADO','TIPIFICACION','SUBTIPIFICACION','TELEFONO','FECHA_PROMESA','VALOR_PROMESA'];

  displayColumns:string[] = ['FECHA','HORA','AGENTE','COMENTARIOS','ACCION','RESULTADO','TIPIFICACION','SUBTIPIFICACION','TELEFONO','FECHA_PROMESA','VALOR_PROMESA'];
  displayColumns2:string[] = ['FECHA','AGENTE','COMENTARIOS','ACCION','RESULTADO','TIPIFICACION','SUBTIPIFICACION','TELEFONO','VALOR_PROMESA'];
  
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  cuenta:string = "";  
  historial:any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSort) sort2!: MatSort;

  fechaAgenda:string = "";

  filtrar(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltrado.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  filtrar2(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = valorFiltrado.trim().toLocaleLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  } 
  

  ngOnInit(): void {
    this.cuenta = this.route.snapshot.paramMap.get('cuenta') || "";    

    var histodata:any[] = []

    this.service.HistorialCuenta(this.cuenta).subscribe(res=>{      
      //console.log("historial neotel:")
      //console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;     
      
    })

    this.service.HistorialCRM(this.cuenta).subscribe( (res:any)=>{      
      res.map((x:any)=>{        
        //this.historial.push(x)
        histodata.push(x)
      })
      
    })

    this.service.HistorialCobros(this.cuenta).subscribe( (res:any)=>{
      res.map( (x:any) =>{        
        histodata.push(x)
      })      

      console.log(histodata)
      this.dataSource2 = new MatTableDataSource(histodata);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2; 
    })

    this.service.FechaAgenda(this.cuenta).subscribe(fa=>{      
      if(fa != undefined){
        this.fechaAgenda = fa[0].FECHA
      }
    })

    

    setTimeout(()=>{
      this.dataSource2 = new MatTableDataSource(histodata);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2; 
    },10000)
  
  }
  

  

}
