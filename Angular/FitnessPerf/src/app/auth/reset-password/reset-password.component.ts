import { Component, Inject } from '@angular/core';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA
} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { emailPlaceholder: string }
  ) {
    this.email = data.emailPlaceholder;
  }

  submitReset() {
    this.dialogRef.close(this.email);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
