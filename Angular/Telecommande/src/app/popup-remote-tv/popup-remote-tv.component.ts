import { Component, OnInit } from '@angular/core';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { MatDialog } from '@angular/material';
import { PopupAlttabComponent } from './popup-alttab/popup-alttab.component';

@Component({
  selector: 'app-popup-remote-tv',
  templateUrl: './popup-remote-tv.component.html',
  styleUrls: ['./popup-remote-tv.component.css']
})
export class PopupRemoteTvComponent implements OnInit {
  currentMedia: any; //TODO Image de base
  arrayChainetvUri: any;
  fullScreenOn: boolean;

  readingIconUri = "assets/reading.gif";
  noCurrentMediaIconUri = "assets/nocurrentmedia.png"
  numberOfCloseCommandsInARow: number = 0;

  constructor(    
    private dialog: MatDialog, 
    private javaService: PopupToJavaService
    ) { }

  ngOnInit() {
    this.arrayChainetvUri =
      [
        { "nom": "tf1", "uri": "assets/tf1.png", "reading": false },
        { "nom": "fr2", "uri": "assets/fr2.png", "reading": false  },
        { "nom": "fr3", "uri": "assets/fr3.png", "reading": false  },
        { "nom": "fr4", "uri": "assets/fr4.png", "reading": false  },
        { "nom": "fr5", "uri": "assets/fr5.png", "reading": false  },
        { "nom": "m6", "uri": "assets/m6.png", "reading": false  },
        { "nom": "fro", "uri": "assets/fro.png", "reading": false  },
        { "nom": "bfm", "uri": "assets/bfm.png", "reading": false  },
      ]

    this.javaService.getCurrentMedia().subscribe((res) => {
      const chaine = this.arrayChainetvUri.find(chaine => chaine.nom === res);
      if (chaine){
        this.currentMedia = chaine.uri;
      }
    });
  }

  resetReading() {
    this.arrayChainetvUri.find(o => o.uri === this.currentMedia).reading = false;
  }

  selectedChannel(chaine: string) {
    if (this.currentMedia) this.resetReading(); 
    this.currentMedia = this.arrayChainetvUri.find(o => o.nom === chaine).uri;

    const elt = this.arrayChainetvUri.find(o => o.nom === chaine);
    elt.reading = true;

    this.javaService.getTvChannel(chaine);
  }

  switchPause() {
    this.javaService.getSwitchPause().subscribe((res) => console.log("switchpuase : ", res));
  }

  fullScreen() {
    this.javaService.postFullScreen().subscribe((res) => this.fullScreenOn = res ? undefined : this.fullScreenOn);
  }

  closeGeneralTab() {
    if ((++this.numberOfCloseCommandsInARow % 3) === 0){
      if (confirm("Ils t'ont rien fait de mal les onglets,\nt'es sûr que tu veux en fermer un de plus ?")){
        this.javaService.getCloseTab().subscribe((res) => this.currentMedia = res ? undefined : this.currentMedia);
      }
    } else {
      this.javaService.getCloseTab().subscribe((res) => this.currentMedia = res ? undefined : this.currentMedia);
    }
  }

  closeReadingTab(){
    this.numberOfCloseCommandsInARow = 0;
    this.javaService.getCloseTab().subscribe((res) =>{
      this.resetReading();
      this.currentMedia = res ? undefined : this.currentMedia;
    });
  }

  switchMonitor() {
    this.javaService.getSwitchMonitor().subscribe((res) => console.log("balek du result ", res));
  }

  openAltTab() {
    const dialogRef = this.dialog.open(PopupAlttabComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
