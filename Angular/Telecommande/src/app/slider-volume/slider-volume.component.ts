import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { PopupToJavaService } from '../service/popup-to-java.service';

@Component({
  selector: 'app-slider-volume',
  templateUrl: './slider-volume.component.html',
  styleUrls: ['./slider-volume.component.css', '../telecommande/telecommande.component.css']
})
export class SliderVolumeComponent {
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 100;
    min = 0;
    step = 1;
    thumbLabel = false;
    currentVolume = 50;
    vertical = false;
    
    constructor(private javaService: PopupToJavaService){
    }

    getCurrentVolume(){
      this.javaService.getCurrentVolume();
    }

    onChangeVolume(event: MatSliderChange){
      console.log(event.value.toString());
      this.javaService.postVolume(event.value.toString()).subscribe(result => this.currentVolume = event.value);
    }
}
