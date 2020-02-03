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
export class PopupContentComponent implements OnInit {

  commande: Commande;
  heures : string[];
  ticksMinutes = [15, 30, 45, 60];
  
  heureChoisie: string;
 
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: PopupToJavaService, 
    public dialogRef: MatDialogRef<PopupContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.commande = new Commande();
      this.commande.radical = data.radical;
      this.heures = this.generateQuartDheure();
    }
 
  onSubmit() {
    this.commande.arguments = this.convertHeureToSeconde();
    console.log("commande.radical = " + this.commande.radical + this.commande.arguments);
    this.userService.save(this.commande).subscribe(result => this.gotoUserList());
  }
 
  gotoUserList() {
    this.router.navigate(['/telecommandeJava']);
  }

  ngOnInit() {}


  selectionnerHeure(choix: string){
    this.heureChoisie = choix;
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
    const heureMinutes = this.heureChoisie.split(":");
    const nbSecondes = Number(heureMinutes[0]) * 3600 + Number(heureMinutes[1])*60; 
    console.log("NB SEC " + nbSecondes);
    return nbSecondes.toString();
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
