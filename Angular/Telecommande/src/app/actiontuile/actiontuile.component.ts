import { Component, OnInit } from '@angular/core';
import { InterfaceActionTuile } from '../interface-action-tuile';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-actiontuile',
  templateUrl: './actiontuile.component.html',
  styleUrls: ['./actiontuile.component.css']
})
export class ActionTuileComponent implements InterfaceActionTuile {
  ouvrirPopupShutdown() {
    throw new Error("Method not implemented.");
  }

  constructor(public dialog: MatDialog) {
  }



}
