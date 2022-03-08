import { Component, OnInit } from '@angular/core';
declare const saveSvgAsPng: any;

@Component({
  selector: 'app-generador-firmas',
  templateUrl: './generador-firmas.component.html',
  styleUrls: ['./generador-firmas.component.css']
})
export class GeneradorFirmasComponent implements OnInit {

  constructor() { }

  nombre:string=""
  name_size:string="27"

  celular:string=""
  extension:string=""
  puesto:string=""
  puesto_size="13"

  ngOnInit(): void {
  }
  saveSVG(): void{ 
    saveSvgAsPng(
      document.getElementById('firma'), 
      "Firma.png", 
      {scale:4}); 
  }
  

}
