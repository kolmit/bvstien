import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupToJavaService } from '../../service/popup-to-java.service';
import { PopupAlttabComponent } from './popup-alttab/popup-alttab.component';

@Component({
  selector: 'app-popup-remote-tv',
  templateUrl: './popup-remote-tv.component.html',
  styleUrls: ['./popup-remote-tv.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class PopupRemoteTvComponent implements OnInit {
  currentMedia: string | null = null; //TODO Image de base
  arrayChainetvUri: Array<{ nom: string; uri: string; reading: boolean }> = [];
  fullScreenOn = false;

  readingIconUri = 'assets/reading.gif';
  noCurrentMediaIconUri = 'assets/nocurrentmedia.png';
  numberOfCloseCommandsInARow = 0;

  constructor(
    private dialog: MatDialog,
    private javaService: PopupToJavaService
  ) {}

  ngOnInit() {
    this.arrayChainetvUri = [
      { nom: 'tf1', uri: 'assets/tf1.png', reading: false },
      { nom: 'fr2', uri: 'assets/fr2.png', reading: false },
      { nom: 'fr3', uri: 'assets/fr3.png', reading: false },
      { nom: 'fr4', uri: 'assets/fr4.png', reading: false },
      { nom: 'fr5', uri: 'assets/fr5.png', reading: false },
      { nom: 'arte', uri: 'assets/arte.png', reading: false },
      { nom: 'm6', uri: 'assets/m6.png', reading: false },
      { nom: 'fro', uri: 'assets/fro.png', reading: false },
      { nom: 'bfm', uri: 'assets/bfm.png', reading: false },
      { nom: 'cnews', uri: 'assets/cnews.png', reading: false },
      { nom: 'c8', uri: 'assets/c8.png', reading: false },
      { nom: 'cstar', uri: 'assets/cstar.png', reading: false },
      { nom: 'w9', uri: 'assets/w9.png', reading: false },
      { nom: 'tfx', uri: 'assets/tfx.png', reading: false },
      { nom: 'tmc', uri: 'assets/tmc.png', reading: false }
    ];

    this.javaService.getCurrentMedia().subscribe((res) => {
      const chaine = this.arrayChainetvUri.find((c) => c.nom === res);
      if (chaine) {
        this.currentMedia = chaine.uri;
      }
    });
  }

  resetReading() {
    const current = this.arrayChainetvUri.find((o) => o.uri === this.currentMedia);
    if (current) {
      current.reading = false;
    }
  }

  selectedChannel(chaine: string) {
    if (this.currentMedia) {
      this.resetReading();
    }
    const elt = this.arrayChainetvUri.find((o) => o.nom === chaine);
    if (!elt) {
      return;
    }
    this.currentMedia = elt.uri;
    elt.reading = true;

    this.javaService.getTvChannel(chaine);
  }

  switchPause() {
    this.javaService.getSwitchPause().subscribe((res) => console.log('switchpuase : ', res));
  }

  fullScreen() {
    this.javaService.postFullScreen().subscribe((res) => {
      this.fullScreenOn = !!res;
    });
  }

  closeGeneralTab() {
    if (++this.numberOfCloseCommandsInARow % 3 === 0) {
      if (confirm("Ils t'ont rien fait de mal les onglets,\nt'es sûr que tu veux en fermer un de plus ?")) {
        this.javaService.getCloseTab().subscribe((res) => (this.currentMedia = res ? null : this.currentMedia));
      }
    } else {
      this.javaService.getCloseTab().subscribe((res) => (this.currentMedia = res ? null : this.currentMedia));
    }
  }

  closeReadingTab() {
    this.numberOfCloseCommandsInARow = 0;
    this.javaService.getCloseTab().subscribe((res) => {
      this.resetReading();
      this.currentMedia = res ? null : this.currentMedia;
    });
  }

  switchMonitor() {
    this.javaService.getSwitchMonitor().subscribe(() => {});
  }

  openAltTab() {
    const dialogRef = this.dialog.open(PopupAlttabComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
