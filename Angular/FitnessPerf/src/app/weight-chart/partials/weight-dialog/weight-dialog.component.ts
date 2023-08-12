import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Weight } from 'src/app/model/weight.model';

@Component({
  selector: 'app-weight-dialog',
  templateUrl: './weight-dialog.component.html',
  styleUrls: ['./weight-dialog.component.scss'],
})
export class WeightDialogComponent implements OnInit {
  weight: Weight;

  constructor(private dialog: MatDialogRef<WeightDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.weight = data?.weight ?? {};
  }

  ngOnInit(): void {}

  submitWeight() {
    this.dialog.close(this.weight);
  }

  setChosenDate(event: Date) {
    this.weight.date = event;
  }
}
