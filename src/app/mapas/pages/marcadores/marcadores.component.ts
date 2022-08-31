import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; 

interface MarcadorColor {
  color:string
  marker?: mapboxgl.Marker
  centro?:[number,number] 
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles:[`
    .mapa-container{
    height :100%;
    width:100%;
    }
    .list-group {
      position:fixed;
      top:20px;
      right:20px;
      z-index:99;
    }
    li {
      cursor:pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  mapa!: mapboxgl.Map
  @ViewChild('mapa') divMapa!:ElementRef
  zoomLevel:number = 15
  center: [number, number] =[-64.48606346802156,-31.420590422552028 ] 

  marcadores: MarcadorColor[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom:this.zoomLevel      
    })
    this.leerMarcadores()

  //  const markerHtml: HTMLElement = document.createElement('div')
  //  markerHtml.innerHTML = 'hola mundo'

  //  new mapboxgl.Marker()
  //    .setLngLat(this.center)
  //    .addTo(this.mapa)
  }

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    console.log(color);
    

    const nuevoMarcador = new mapboxgl.Marker({
      draggable:true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.marcadores.push({
      color:color,
      marker:nuevoMarcador
    })  
    this.guardarMarcadores()

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadores()
    })
  }

  irMarcador(marker?:mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker?.getLngLat()
    })
  }

  guardarMarcadores() {

    const coordenadas:MarcadorColor[] = [] 

    this.marcadores.forEach(m => {
      const color = m.color
      const {lng,lat} = m.marker!.getLngLat()

      coordenadas.push({
        color: color,
        centro: [lng,lat]
      })
    })
    
    localStorage.setItem('marcadores',JSON.stringify(coordenadas))
  }

  leerMarcadores() {
    if(!localStorage.getItem('marcadores')){
      return
    }
    const coordenadas:MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    coordenadas.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)

        this.marcadores.push({
          marker:newMarker,
          color:m.color
        })

        newMarker.on('dragend', () => {
          this.guardarMarcadores()
        })
    
    })

  }

  borrarMarcador(i:number) {
    this.marcadores[i].marker?.remove()
    this.marcadores.splice(i,1)
    this.guardarMarcadores()
  }

}
