import { Component, OnInit, Inject } from '@angular/core';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from '../model/commande';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.css']
})
export class PopupContentComponent {

  commande: Commande;
  heures : string[];
  ticksMinutes = [15, 30, 45, 60];
  
  heureSelected: string;
  shutdownActive: boolean;
  shutdownIn: number;

  

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: PopupToJavaService, 
    public dialogRef: MatDialogRef<PopupContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      dialogRef.beforeClosed().subscribe(() => this.closePopup())
      this.commande = new Commande();
      this.commande.radical = data.radical;

      if (data.shutdownCountdown != undefined){
        this.shutdownActive = true;
        this.shutdownIn = data.shutdownCountdown;
      }
      this.heures = this.generateQuartDheure();
    }
 
  onSubmitShutdown() {
    let cmdShutdown = new Commande(); 
    cmdShutdown.radical = this.commande.radical;
    cmdShutdown.arguments = " -s -t " + this.convertHeureToSeconde().toString();

    console.log("commande.radical = " + cmdShutdown.radical + cmdShutdown.arguments);
    this.userService.save(cmdShutdown).subscribe();
    this.shutdownActive = true;
    this.shutdownIn = this.convertHeureToSeconde();
    this.heureSelected = null; 

    this.closePopup();
  }

  onSubmitCancel(){
    let cmdCancel = new Commande(); 
    cmdCancel.radical = this.commande.radical;
    cmdCancel.arguments = " -a";
    this.userService.save(cmdCancel).subscribe();
    this.shutdownActive = false;
    this.shutdownIn = null;

    this.closePopup();
  }

  closePopup(){
    this.dialogRef.close(this.shutdownIn);
  }


  selectionnerHeure(choix: string){
    this.heureSelected = choix;
    console.log("selectHeure() = " + choix);
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
    console.log("NB SEC " + nbSecondes);
    this.shutdownIn = nbSecondes;
    return nbSecondes;
  }


  convertSecondeToHeure(){
    const hh = Math.floor(this.shutdownIn/3600);
    const mm = (this.shutdownIn%3600)/60;
    return hh.toString() + 'h' + mm.toString();
  }

  
  /*calculerHeure() {
    const now = new Date(Date.now());
    const heureNow = now.getHours();
    const minuteNow = now.getMinutes();

    let prochainQuart;

    console.log(heureNow + ":" + minuteNow);

    this.ticksMinutes.forEach(element => {
      if (element - minuteNow < 15){
        console.log('Prochain quart : ' + element);
        prochainQuart = element%60;
      }
    });
  }*/
}
