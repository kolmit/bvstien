import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutPickerComponent } from './workout-picker/workout-picker.component';
import { ExercisePickerComponent } from './exercises-picker/exercises-picker.component';
import { WorkoutService } from './services/workout.service';

import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SnackbarService } from './services/snackbar.service';
import { DatePickerComponent } from './exercises-picker/partials/date-picker/date-picker.component';
import { ExercisePickerDialogComponent } from './exercises-picker/partials/exercise-picker-dialog/exercise-picker-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MultiChoiceDialogComponent } from './multi-choice-dialog/multi-choice-dialog.component';
import { HeaderComponent } from './header/header.component';
import { LastSessionsComponent } from './exercises-picker/partials/last-sessions/last-sessions.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutPickerComponent,
    ExercisePickerComponent,
    LastSessionsComponent,
    LoginComponent,
    ResetPasswordComponent,
    DatePickerComponent,
    ExercisePickerDialogComponent,
    ConfigurationComponent,
    MultiChoiceDialogComponent,
    HeaderComponent
  ],
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    WorkoutService, 
    AuthGuard, 
    SnackbarService,
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: 250 }}
  ],
  entryComponents: [LastSessionsComponent, DatePickerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }