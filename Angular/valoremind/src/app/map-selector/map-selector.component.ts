import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {
  mapList: string[] = ["Ascent", "Bind", "Haven", "Icebox", "Split"]
  @Output() mapSelected = new EventEmitter<string>();

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  selectMap(mapName: string){
    this.mapService.updateMapSelected(mapName);
  }

}
