import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private service:TicketsService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias():void{
    this.service.getCategorias().subscribe(r=>{
      console.log(r)
    })
  }

}
