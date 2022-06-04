import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-multi-choice-dialog',
  templateUrl: './multi-choice-dialog.component.html',
  styleUrls: ['./multi-choice-dialog.component.scss']
})

export class MultiChoiceDialogComponent {
  question: string;

  choices: string[];
  inputRequested: boolean;
  inputValue: string;

  colors: string[] = ["#376c9f", "#9f3737"]; 

  constructor(public dialogRef: MatDialogRef<MultiChoiceDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {question: string, choices?: string[], inputRequested?: boolean} ) {
      this.question = data.question;
      this.choices = data.choices;
      this.inputRequested = data.inputRequested;
  }

  choiceSelected(choice: string): void {
    this.dialogRef.close(choice);
  }

  inputSelected(value: string): void {
    this.dialogRef.close(value);
  }
}