import { Component, OnInit } from '@angular/core';
import { PopupContentComponent } from '../popupcontent/popupcontent.component';
import { MatDialog } from '@angular/material';

export interface Tuile {
  couleur: string;
  nbColonne: number;
  nbLigne: number;
  texte: string;
  icone: string;
  action: string;
  // On peut définir des fonctions dans une interface...
  // actionman();
}

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent implements OnInit {

  listeTuile: Tuile[] = [
    {texte: 'Eteindre', nbColonne: 1, nbLigne: 1, couleur: 'lightpink', icone: 'power_settings_new', action: 'bite'},
    {texte: 'Two', nbColonne: 1, nbLigne: 2, couleur: 'lightgreen', icone: '', action: 'bite'},
    {texte: 'Three', nbColonne: 1, nbLigne: 1, couleur: 'lightpink', icone: '', action: 'bite'},
    {texte: 'Four', nbColonne: 2, nbLigne: 1, couleur: '#DDBDF1', icone: '', action: 'bite'},
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  bite(){    
      const dialogRef = this.dialog.open(PopupContentComponent, {
        width: '250px',
        data: {}
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result != null){
          console.log('The dialog was closed' + result);
        }
      });
    }
  
}
