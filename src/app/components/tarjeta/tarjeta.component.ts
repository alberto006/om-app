import { Component, OnInit } from '@angular/core';
declare const saveSvgAsPng: any;


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  constructor() { }

  nombre:string=""
  name_size:string="66"
  
  

  ngOnInit(): void {
    
  }

  
    
  saveSVG(): void{ 
    saveSvgAsPng(
      document.getElementById('tarjeta-cumpleaños'), 
      `Tarjeta-${this.nombre}.png`, 
      {scale:4}); 
    }
  }
