import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapSelected: Subject<string> = new Subject<string>();

  constructor() { }

  updateMapSelected(mapSelected: string){
    this.mapSelected.next(mapSelected);
  }
}
