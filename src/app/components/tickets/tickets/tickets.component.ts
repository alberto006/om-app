import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private service:TicketsService) { }

  cripted:string =""
  decripted:string = ""

  msgCliente:string = ""
  msgCripted:string=""
  msgServerDecripted:string = ""

  ngOnInit(): void {

    this.service.getEncripted("probando").subscribe(r=>{
      this.cripted = r.data
      this.decripted = this.service.decrytp(r.data)
    })    
  }

  cripto():void{
    this.msgCripted = this.service.encrypt(this.msgCliente).toString();
    
  }

  enviar():void{
    this.service.getDecripted(this.msgCripted).subscribe(r=>{
      
      this.msgServerDecripted = r.data
    }) 
  }

  

}
