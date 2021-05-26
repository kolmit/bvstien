import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ResizableDraggableComponent } from '../resizable-draggable/resizable-draggable.component';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  mapSelected: string = "Bind"; // TODO : Supprimer cette init
  draggableItems: ResizableDraggableComponent[];
  @ViewChild('parent', {read: ViewContainerRef, static: false}) target: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  
  constructor(private mapService: MapService, private componentFactoryResolver: ComponentFactoryResolver) { } 

  ngOnInit() {
    this.mapService.mapSelected.subscribe( (mapSelected) => {
      this.mapSelected = mapSelected;
    })
  }

  addElement(){
    let childComponent = this.componentFactoryResolver.resolveComponentFactory(ResizableDraggableComponent);
    this.componentRef = this.target.createComponent(childComponent);
  }
}