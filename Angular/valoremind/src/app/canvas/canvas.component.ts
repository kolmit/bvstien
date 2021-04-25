import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  mapSelected: string = "Bind"; // TODO : Supprimer cette init

  constructor(private mapService: MapService) { } 

  ngOnInit() {
    this.mapService.mapSelected.subscribe( (mapSelected) => {
      this.mapSelected = mapSelected;
    })
  }
}