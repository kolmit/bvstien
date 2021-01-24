import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { Commande } from '../model/commande';

@Component({
  selector: 'app-slider-volume',
  templateUrl: './slider-volume.component.html',
  styleUrls: ['./slider-volume.component.css', '../telecommande/telecommande.component.css']
})
export class SliderVolumeComponent {
    commande: Commande;
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
      this.commande = new Commande();
      this.commande.radical = "nircmd changesysvolume ";
    }

    getCurrentVolume(){
      this.javaService.getCurrentVolume();
    }

    onChangeVolume(event: MatSliderChange){
      console.log(event.value.toString());
      this.commande.arguments = event.value.toString();
      this.javaService.postVolume(this.commande).subscribe(result => this.currentVolume = event.value);
    }
}
