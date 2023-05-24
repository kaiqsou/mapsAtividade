import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation, Position } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;

  constructor() { }

  ionViewWillEnter(){
    this.createMap();
  }
  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: -23.592539,
          lng: -46.662541,
        },
        zoom: 19,
      },
    });
    this.buscarPosicao();
  }
  async buscarPosicao() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.adicionarMarcador(coordinates);
    return coordinates;
  }
  
  async adicionarMarcador(coordinates: Position) {
    const markerId = await this.map.addMarker({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      },
    });
    this.zoomMarcador(coordinates)
  }
  
  zoomMarcador(coordinates: Position) {
    this.map.setCamera({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      },
      zoom: 15,
      animate: true
    });
  }
}
