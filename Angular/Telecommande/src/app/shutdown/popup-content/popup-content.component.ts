import { Component, Inject, OnDestroy } from '@angular/core';
import { PopupToJavaService } from '../../service/popup-to-java.service';
import { ActivatedRoute } from '@angular/router';
import { Commande } from '../../model/commande';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.css']
})
export class PopupContentComponent{
  commande: Commande;
  heures : string[];
  
  heureSelected: string;
  shutdownActive: boolean;
  shutdownTimeRequested: number;


  constructor(private javaService: PopupToJavaService, 
    public stateService: StateService,
    public dialogRef: MatDialogRef<PopupContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.commande = new Commande();
      this.commande.radical = data.radical;

      if (data.shutdownCountdown != undefined){
        this.shutdownActive = true;
        this.shutdownTimeRequested = data.shutdownCountdown;
      }
      this.heures = this.generateQuartDheure();
    }


  onSubmitShutdown() {
    this.javaService.manageShutdown(this.convertHeureToSeconde()).subscribe(result => {
      this.shutdownTimeRequested = result;
      this.stateService.setShutdownActive(true);
    });
    this.shutdownActive = true;
    this.shutdownTimeRequested = this.convertHeureToSeconde();
    this.heureSelected = null; 
  }

  onSubmitCancel(){
    this.javaService.cancelShutdown().subscribe(result => {
      this.stateService.setShutdownActive(!result);
    });
    this.shutdownActive = false;
    this.shutdownTimeRequested = null;
  }

  selectionnerHeure(choix: string){
    this.heureSelected = choix;
  }

  generateQuartDheure(){
    let quartHeure : Array<string> = Array();
    for (let h = 0 ; h < 24 ; h++){
      const heures = h;
      for (let m = 0 ; m < 4 ; m++){
        const minutes = m == 0 ? '00' : m*15;
        quartHeure.push(heures + ':' + minutes);
      }
    }
    
    return quartHeure;
  }

  convertHeureToSeconde(){
    if (this.heureSelected == undefined){
      return;
    }
    const heureMinutes = this.heureSelected.split(":");
    const nbSecondes = Number(heureMinutes[0]) * 3600 + Number(heureMinutes[1])*60; 

    this.shutdownTimeRequested = nbSecondes;
    return nbSecondes;
  }
}
