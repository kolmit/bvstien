import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private snackbarService: SnackbarService) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.snackbarService.openSnackBar("Bienvenue " + email, "💪");
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      localStorage.setItem('login', email);
      localStorage.setItem('userid', value.user.uid);
      this.router.navigateByUrl('/workout');
    })
    .catch(error => {
      this.snackbarService.openSnackBar(error.message, '❌')
      console.log('Erreur login: ', error.message);
    });
  }

  passwordForgotten(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.snackbarService.openSnackBar("Un e-mail pour réinitiliser votre mot de passe a été envoyé à : ", email);
    })
    .catch(error => {
      this.snackbarService.openSnackBar(error.message, '❌')
      console.log('Erreur lors de la réinitialisation du mot de passe: ', error.message);
    });
  }

  
  isLoggedIn() {
    return localStorage.getItem('login') !== null;
  }

  
  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
     console.log('Succes', value);
     this.login(email, password);
     this.router.navigateByUrl('/workout');
    })
    .catch(error => {
      this.snackbarService.openSnackBar(error.message, '❌')
      console.log('Erreur: ', error);
    });
  }


  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('login');
      localStorage.removeItem('userid');
      this.router.navigate(['/']);
    });
  } 
}