import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { Commande } from '../model/commande';

@Component({
  selector: 'app-slider-volume',
  templateUrl: './slider-volume.component.html',
  styleUrls: ['./slider-volume.component.css']
})
export class SliderVolumeComponent {
    commande: Commande;
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 100;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = false;
    value = 0;
    vertical = false;
  
    constructor(private javaService: PopupToJavaService){
      this.commande = new Commande();
      this.commande.radical = "nircmd changesysvolume ";
    }

    get tickInterval(): number | 'auto' {
      return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(value) {
      //this._tickInterval = coerceNumberProperty(value);
    }
    private _tickInterval = 1;

    getCurrentVolume(){
      this.javaService.getCurrentVolume();
    }
    onChangeVolume(event: MatSliderChange){
      console.log(event.value);
      this.commande.arguments = event.value.toString();
      this.javaService.postVolume(this.commande).subscribe(result => console.log('RESULT'));
    }
  

}
