import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id:string = "";
  crm:string = ""

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('cuenta') || "";
    this.crm = this.route.snapshot.paramMap.get('crm') || "";
  }

}
