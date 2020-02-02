import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Tuile } from '../tuile';


@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent implements OnInit {

  listeTuile: Tuile[] = [
    {texte: 'Eteindre', nbColonne: 1, nbLigne: 1, couleur: 'lightpink', icone: 'power_settings_new', nomMethode: 'openDialog'},
    {texte: 'Two', nbColonne: 1, nbLigne: 2, couleur: 'lightgreen', icone: '', nomMethode: 'openDialog'},
    {texte: 'Three', nbColonne: 1, nbLigne: 1, couleur: 'lightpink', icone: '', nomMethode: 'openDialog'},
    {texte: 'Four', nbColonne: 2, nbLigne: 1, couleur: '#DDBDF1', icone: '', nomMethode: 'openDialog'},
  ];


  constructor(public dialog : MatDialog) { }

  ngOnInit() {
  }

}
