import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles:[`#mapa{height :100%;width:100%;}`]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
    
    let map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center:[-64.48606346802156,-31.420590422552028 ],
      zoom:18      
    })

  }

}
