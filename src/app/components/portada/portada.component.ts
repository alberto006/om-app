import { Component, OnInit } from '@angular/core';
import { PortadaService } from './portada.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css','./carousel.css']
})


export class PortadaComponent implements OnInit {

  constructor(private service:PortadaService, private sanitizer: DomSanitizer) { }

  listaNoticias:any[] = [];
  imagenes:string[] =[]

  ngOnInit(): void {
    this.noticias()    
  }

  noticias():void{
    this.service.getNoticias().subscribe(res=>{     

      res.map((x:any)=>{              
        console.log(btoa(x.imagen.data))
        this.listaNoticias.push( 
          {
            titulo:x.titulo,
            comentario:x.comentario,
            fecha_programacion:x.fecha_programacion,
            imagen:this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/*;base64,${(x.imagen)}`)
          })
      })
      console.log(this.listaNoticias)
      
    })
  }

  

}
