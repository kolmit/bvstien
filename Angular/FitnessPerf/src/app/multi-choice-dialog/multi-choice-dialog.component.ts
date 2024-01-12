import { Component, Inject, OnInit } from '@angular/core';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';

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

  colors: string[] = ['#376c9f', '#9f3737'];

  constructor(
    public dialogRef: MatDialogRef<MultiChoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { question: string; choices?: string[]; inputRequested?: boolean }
  ) {
    this.question = data.question;
    this.choices = data.choices;
    this.inputRequested = data.inputRequested;
  }

  choiceSelected(choice: any): void {
    this.dialogRef.close(choice);
  }

  inputSelected(): void {
    this.dialogRef.close(this.inputValue);
  }
}
