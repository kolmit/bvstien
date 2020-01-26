import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export class FormDataLol{
  tempsSeconde: string;
}

@Component({
  selector: 'app-popupcontent',
  templateUrl: './popupcontent.component.html',
})
export class PopupContentComponent {

  tempsSeconde : any;

  constructor(
    public dialogRef: MatDialogRef<PopupContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [{temps:'temps'}]) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
