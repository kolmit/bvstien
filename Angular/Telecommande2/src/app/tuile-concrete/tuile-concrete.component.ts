import { Component, OnInit, Inject } from '@angular/core';
import { Tuile } from '../tuile';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Component({
  selector: 'app-tuile-concrete',
  templateUrl: './tuile-concrete.component.html',
  styleUrls: ['./tuile-concrete.component.css']
})
export class TuileConcreteComponent implements OnInit, Tuile {
  texte: string;
  nbColonne: number;
  nbLigne: number;
  couleur: string;
  icone: string;
  nomMethode: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
