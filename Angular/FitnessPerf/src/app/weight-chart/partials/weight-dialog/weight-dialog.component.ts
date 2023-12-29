import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Weight } from 'src/app/model/weight.model';
import { SnackbarService } from 'src/app/services/snackbar.service';

export declare type WeightDialogResult = {
  weight: Weight,
  isUpdate: boolean
}
@Component({
  selector: 'app-weight-dialog',
  templateUrl: './weight-dialog.component.html',
  styleUrls: ['./weight-dialog.component.scss'],
})
export class WeightDialogComponent implements OnInit {
  weight: Weight;

  constructor(private snackbarService: SnackbarService,
    private dialog: MatDialogRef<WeightDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) 
  {
      this.weight = data?.weight ?? {};
      if (!this.weight?.date) {
        this.weight.date = new Date();
      }
  }

  ngOnInit(): void {}

  submitWeight() {
    if (this.weight.date && this.weight.totalWeight) {
      this.dialog.close({
        weight: this.weight,
        isUpdate: true
      });
    } else {
      this.snackbarService.openSnackBar('Poids et date obligatoires');
    }
  }

  deleteWeight() {
    this.dialog.close({
      weight: this.weight,
      isUpdate: false
    });  
  }

  setChosenDate(event: Date) {
    this.weight.date = event;
  }
}
