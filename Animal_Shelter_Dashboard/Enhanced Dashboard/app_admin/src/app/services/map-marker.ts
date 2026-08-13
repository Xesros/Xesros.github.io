import { Injectable, Input } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})

export class MapMarker {
  layerGroup = new L.LayerGroup;

  constructor(){
  }

  makeMarkers(map: L.Map, locations: Array<any>): any {
    if(locations != null){

      for (const c of locations) { //Create markers for available data entries

        const lon = c.location_long;
        const lat = c.location_lat;
        const circle = L.circleMarker([lat, lon]).bindPopup(c.rec_num + '');
        circle.addTo(this.layerGroup);
      }
    }
    return this.layerGroup;
  }

  removeMarkers(){
    this.layerGroup.clearLayers();
  }

}
