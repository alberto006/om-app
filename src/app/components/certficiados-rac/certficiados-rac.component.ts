import { Component, OnInit } from '@angular/core';
declare const saveSvgAsPng: any;
@Component({
  selector: 'app-certficiados-rac',
  templateUrl: './certficiados-rac.component.html',
  styleUrls: ['./certficiados-rac.component.css']
})
export class CertficiadosRacComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getDates();
    this.mes_certificado = this.month
  }

  nombre:string="";
  nombre_size:string="70"  
  campaing:string="";
  campaing_size:string="15"
  day:string="";
  month:string="";  
  year:string="";
  mes_certificado:string=""

  meses = [
    {value:"Enero"},
    {value:"Febrero"},
    {value:"Marzo"},
    {value:"Abril"},
    {value:"Mayo"},
    {value:"Junio"},
    {value:"Julio"},
    {value:"Agosto"},
    {value:"Septiembre"},
    {value:"Noviembre"},
    {value:"Diciembre"}
  ]

  getDates():void{
    var date = new Date();
    
    var dia =  `000${date.getUTCDay().toString()}`;
    this.day = dia.slice(2,dia.length);


    //var mes = `00${date.getMonth.toString()}`
    this.month = this.meses[date.getMonth()].value;
    this.year = date.getFullYear().toString()

  }

  saveSVG(): void{ 
    saveSvgAsPng(
      document.getElementById('f3a4b0f6-7cdf-4de6-9182-acbf3b527401'), 
      `Certificado-${this.nombre}.png`, 
      {scale:4}); 
  }

  

}
