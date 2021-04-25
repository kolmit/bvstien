import { Component, Inject, OnDestroy } from '@angular/core';
import { PopupToJavaService } from '../../service/popup-to-java.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-popup-shutdown',
  templateUrl: './popup-shutdown.component.html',
  styleUrls: ['./popup-shutdown.component.css']
})
export class PopupShutdownComponent{
  heures : string[];
  
  heureSelected: string;
  shutdownTimeRequested: number;
  isShutdown: boolean = true;


  constructor(private javaService: PopupToJavaService, 
    public stateService: StateService,
    public dialogRef: MatDialogRef<PopupShutdownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (data.shutdownCountdown != undefined){
        this.shutdownTimeRequested = data.shutdownCountdown;
      }
      this.heures = this.generateQuartDheure();
    }


  onSubmitShutdown() {
    this.javaService.manageShutdown(this.convertHeureToSeconde(), this.isShutdown).subscribe(result => {
      this.shutdownTimeRequested = result;
      this.stateService.setShutdownActive(true);
      this.stateService.fetchShutdownState();
    });
    this.shutdownTimeRequested = this.convertHeureToSeconde();
    this.heureSelected = null; 
  }

  onSubmitCancel(){
    this.javaService.cancelShutdown().subscribe(result => {
      this.stateService.setShutdownActive(false);
    });
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


  displayCountdown(){
    this.javaService.getShutdownCount().subscribe( (res) => {
        console.log(res);
    });
  }

  shutdownAction(isShutdownAction: boolean){
    this.isShutdown = isShutdownAction;
  }
}