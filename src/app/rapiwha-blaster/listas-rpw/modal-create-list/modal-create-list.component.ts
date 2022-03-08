import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-create-list',
  templateUrl: './modal-create-list.component.html',
  styleUrls: ['./modal-create-list.component.css']
})
export class ModalCreateListComponent implements OnInit {

  nombre:string="";
  fecha_programacion:Date=new Date()
  total:string = "";
  enviados:string="";
  pendientes:string="";


  constructor() { }

  ngOnInit(): void {
  }

}
