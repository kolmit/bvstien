import { Component, OnInit } from '@angular/core';
import { PopupToJavaService } from 'src/app/service/popup-to-java.service';

@Component({
  selector: 'app-volume-switch-tile',
  templateUrl: './volume-switch-tile.component.html',
  styleUrls: ['./volume-switch-tile.component.css', '../../telecommande/telecommande.component.css']
})
export class VolumeSwitchTileComponent implements OnInit {
  MUTE: string = "1";
  UNMUTE: string = "0";
  currentMuted: boolean = false;


  constructor(private javaService: PopupToJavaService) { }

  ngOnInit() {
    this.javaService.getMute().subscribe( (isMuted) => {
      this.currentMuted = isMuted;
    });
  }

  switchVolumeMute(){
    let muteOrUnmute = this.currentMuted ? this.UNMUTE : this.MUTE;

    this.javaService.postMute(muteOrUnmute).subscribe(result =>{
      this.currentMuted = result;
    });  
  }

  getMuteClass(){
    let classList = 'material-icons tuile_1x1';
    return classList + (this.currentMuted ? ' mutedVolume' : ' notMutedVolume');
  }
}