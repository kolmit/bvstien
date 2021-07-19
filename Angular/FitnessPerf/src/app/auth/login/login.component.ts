import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    public dialog: MatDialog) { }

  email;
  emailToCreate;
  password;
  passwordToCreate;
  
  openResetPasswordDialog() {
    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: {emailPlaceholder: this.email}
    });

    dialogRef.afterClosed().subscribe((emailToReset) => {
      if (emailToReset) {
        this.authService.passwordForgotten(emailToReset);
      }
    })
  }
  
  ngOnInit() {}

  onLogin(loginForm) {
    if (loginForm.valid) {
      this.authService.login(
        loginForm.value.email,
        loginForm.value.password
      );
    }
  }

  onSignup(signupForm) {
    if (signupForm.valid) {
      this.authService.emailSignup(
        signupForm.value.emailToCreate,
        signupForm.value.passwordToCreate
      );
    }
  }
}