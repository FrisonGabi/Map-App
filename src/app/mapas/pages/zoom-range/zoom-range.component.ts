import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles:[`
    .mapa-container{
     height :100%;
     width:100%;
    }
    .row {
      width:400px;
      background-color:white;
      z-index:999;
      position:fixed;
      bottom:50px;
      left:50px;
      padding:5px;
      border-radius:4px;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  mapa!: mapboxgl.Map
  @ViewChild('mapa') divMapa!:ElementRef
  zoomLevel:number = 10
  center: [number, number] =[-64.48606346802156,-31.420590422552028 ] 


  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {})
    this.mapa.off('zoomend', () => {})
    this.mapa.off('move', () => {})
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom:this.zoomLevel      
    })

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom()
    })

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    })

    this.mapa.on('move', (ev) => {
      const target = ev.target
      const {lng, lat} = target.getCenter()

      this.center = [lng , lat]
      
    })

  }


  zoomOut(){
    this.mapa.zoomOut()

  }

  zoomIn(){
    this.mapa.zoomIn()
  }

  zoomCambio(valor:string) {
    this.mapa.zoomTo(Number(valor))
  }

}
