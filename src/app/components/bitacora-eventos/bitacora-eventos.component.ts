import { Component, OnInit } from '@angular/core';
import { EventosService } from './eventos.service';



@Component({
  selector: 'app-bitacora-eventos',
  templateUrl: './bitacora-eventos.component.html',
  styleUrls: ['./bitacora-eventos.component.css']
})
export class BitacoraEventosComponent implements OnInit {

  constructor(private service:EventosService) { }


  ngOnInit(): void {
  }

}

