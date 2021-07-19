import { Component } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
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

  submitDate() {
    console.log(this.chosenDate);
    this.dialogRef.close(this.chosenDate);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}