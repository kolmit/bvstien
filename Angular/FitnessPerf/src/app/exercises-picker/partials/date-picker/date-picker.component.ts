import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  picker: Date;
  chosenDate: Date = new Date();
  maxDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>) { }

  setChosenDate(event: Date) {
    this.chosenDate = event;
  }

  submitDate() {
    this.dialogRef.close(this.chosenDate);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}