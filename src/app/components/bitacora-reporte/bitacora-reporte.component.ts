import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BitacoraReporteService } from './bitacora-reporte.service';

import { ExcelService } from '../excel/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-bitacora-reporte',
  templateUrl: './bitacora-reporte.component.html',
  styleUrls: ['./bitacora-reporte.component.css']
})
export class BitacoraReporteComponent implements OnInit {

  constructor(private service: BitacoraReporteService, private _snackBar: MatSnackBar, private excel: ExcelService) { }

  DataResumen1:any = [];
  DataResumen2:any = [];
  displayColumns: string[] = ["EVENTO", "MES1", "MES2", "MES3"];
  displayColumns2: string[] = ["ELEMENTO", "H8", "H9", "H10","H11","H12","H13","H14","H15","H16","H17","H18"];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  reportes: string[] = ["Incidentes", "Por Evento", "Por Elemento"];

  reporteSelected: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

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

    this.service.reporteResumenPrincipal().subscribe(r => {
      this.dataSource = new MatTableDataSource(r)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.DataResumen1 = r;

      this.getTotalMes1();
      this.getTotalMes2();
      this.getTotalMes3();
    })

    this.service.reporteResumen2().subscribe(r => {
      this.dataSource2 = new MatTableDataSource(r)
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2
      this.DataResumen2 = r;
    })
  }

  seleccionarReporte(reporte: string) {
    this.reporteSelected = reporte;
  }

  getTotalMes1(){
    var incidentesMes1 = 0;
    this.DataResumen1.map((t:any)=>{
      incidentesMes1 += parseInt(t.MES1)       
    })
    return incidentesMes1;
  }

  getTotalMes2(){
    var incidentesMes = 0;
    this.DataResumen1.map((t:any)=>{
      incidentesMes += parseInt(t.MES2)       
    })
    return incidentesMes;
  }
  getTotalMes3(){
    var incidentesMes = 0;
    this.DataResumen1.map((t:any)=>{
      incidentesMes += parseInt(t.MES3)       
    })
    return incidentesMes;
  }

  

  generarReporte(inicio: string, fin: string) {
    if (this.reporteSelected == "") {
      this.notificacion("debe seleccionar un reporte")
      return;
    }
    if (inicio == "") {
      this.notificacion("Seleccione una fecha de inicio")
      return;
    }
    if (fin == "") {
      this.notificacion("Seleccione una fecha de fin")
      return;
    }

    var report = this.reporteSelected.replace(/\s/g, '_');
    report = report.toLocaleUpperCase()

    this.service.getReporteBitacora(report, inicio, fin).subscribe(result => {
      this.excel.exportAsExcelFile(result, "reporte_" + report);
    })

  }

  notificacion(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }



  }
