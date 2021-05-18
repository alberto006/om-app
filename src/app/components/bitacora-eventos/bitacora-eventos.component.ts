import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EventosService } from './eventos.service';



@Component({
  selector: 'app-bitacora-eventos',
  templateUrl: './bitacora-eventos.component.html',
  styleUrls: ['./bitacora-eventos.component.css']
})
export class BitacoraEventosComponent implements OnInit {

  constructor(private service:EventosService, private _snackBar:MatSnackBar) { }

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

    if(window.screen.width < 760){
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

}

