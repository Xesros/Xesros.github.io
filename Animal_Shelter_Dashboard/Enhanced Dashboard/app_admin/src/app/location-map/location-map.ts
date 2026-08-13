import { Component, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { MapMarker } from '../services/map-marker';
import { AnimalIntData } from '../models/animals';

@Component({
  selector: 'app-location-map',
  imports: [],
  templateUrl: './location-map.html',
  styleUrl: './location-map.css',
})
export class LocationMap implements AfterViewInit{
  private map! : L.Map;
  dataEmpty: AnimalIntData[] = [];

  @Input() locations = this.dataEmpty;
  markerGroup = new L.Layer;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 30.75,-97.48],
      zoom: 10
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  constructor(private MapMarker: MapMarker) { }

  ngAfterViewInit(): void {
      this.initMap();
    }

  ngOnChanges(){
    
    if(this.locations){
      this.MapMarker.removeMarkers();
        console.log(`Map Locations:\n` + this.locations);
        
        let markers = this.MapMarker.makeMarkers(this.map, this.locations);

        markers.addTo(this.map);
      }
  }
}
