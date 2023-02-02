import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exercise-picker-dialog',
  templateUrl: './exercise-picker-dialog.component.html',
  styleUrls: ['./exercise-picker-dialog.component.scss']
})
export class ExercisePickerDialogComponent implements OnInit {
  newExoName;
  constructor(public dialogRef: MatDialogRef<ExercisePickerDialogComponent>) { }

  ngOnInit(): void {
  }

  submitExercise(addExoToConfiguration: boolean) {
    this.dialogRef.close(
      {
        exerciseName: this.newExoName,
        addExoToConfiguration: addExoToConfiguration
      }
    );
  }
}
