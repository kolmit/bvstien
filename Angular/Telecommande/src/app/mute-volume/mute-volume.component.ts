import { Component, Output } from '@angular/core';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { Commande } from '../model/commande';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-mute-volume',
  templateUrl: './mute-volume.component.html',
  styleUrls: ['./mute-volume.component.css']
})
export class MuteVolumeComponent {

  commandeMute: Commande;
  @Output() currentVolume: number;

  MUTE: string = "1";
  UNMUTE: string = "0";
  
  muted = new BehaviorSubject<boolean>(false);
  muted$ = this.muted.asObservable();


  private get isMuted():boolean {
    return this.muted.getValue()
  }


  constructor(private javaService: PopupToJavaService){
    this.commandeMute = new Commande();
    this.commandeMute.radical = "nircmd.exe mutesysvolume ";
    this.commandeMute.arguments = this.MUTE;
  }

  getCurrentVolume(){
    this.javaService.getCurrentVolume();
  }

  muteDefaultOutput(){
    this.commandeMute.arguments = this.muted.value ? this.UNMUTE : this.MUTE;

    this.javaService.postMute(this.commandeMute).subscribe(result =>{
      this.muted.next(result);
    });
  }
}
