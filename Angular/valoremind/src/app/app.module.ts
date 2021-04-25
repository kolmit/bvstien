import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AgentSelectorComponent } from './agent-selector/agent-selector.component';
import { ResizableDraggableComponent } from './resizable-draggable/resizable-draggable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MapSelectorComponent,
    CanvasComponent,
    AgentSelectorComponent,
    ResizableDraggableComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
