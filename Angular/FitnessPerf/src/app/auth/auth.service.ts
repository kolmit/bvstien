import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { SnackbarService } from '../services/snackbar.service';
import { WorkoutService } from '../services/workout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private snackbarService: SnackbarService,
    private workoutService: WorkoutService) {
      
  }

  ngOnInit(): void {
    this.listenToAuthState();
  }

  /** Méthode permettant de gérer l'authentification */
  listenToAuthState() {
    this.afAuth.onAuthStateChanged( (user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        //this.router.navigateByUrl('/workout');
      } else {
        this.router.navigateByUrl('/');
      } 
    });
  }

  login(email: string, password: string, fromSignup?: boolean) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.snackbarService.openSnackBar("Bienvenue " + email, "💪");
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then;
      localStorage.setItem('login', email);
      localStorage.setItem('userid', value.user.uid);

      this.initUserData(fromSignup);

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
     this.login(email, password, true);
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
      this.workoutService.onDestroy();

      this.router.navigate(['/']);
    });
  } 

  /**
   * @param fromSignup Si l'utilisateur vient de s'enregistrer, on charge les exercices de bases
   * Sinon on charge ses exercices stockés dans "user_exercises"
   */
  initUserData(fromSignup?: boolean) {
    if (fromSignup) {
      this.workoutService.insertDefaultWorkoutList();
    } 
    else {
      this.workoutService.fetchAllWorkouts();
    }
  }
}