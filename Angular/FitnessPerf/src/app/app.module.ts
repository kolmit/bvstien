import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutPickerComponent } from './workout-picker/workout-picker.component';
import { ExercisePickerComponent } from './exercises-picker/exercises-picker.component';
import { WorkoutService } from './services/workout.service';

import { firebaseConfig } from 'src/environments/environment';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { list } from '@angular/fire/database';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule  } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyTabsModule as MatTabsModule, MAT_LEGACY_TABS_CONFIG as MAT_TABS_CONFIG } from '@angular/material/legacy-tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ManageWorkoutToProgramDialogComponent } from './workout-picker/partials/manage-workout-to-program-dialog/manage-workout-to-program-dialog.component';
import { CollapseMenuComponent } from './collapse-menu/collapse-menu.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { InputComponent } from './input-component/input-component.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { TimelineProgramComponent } from './timeline/program-timeline/timeline-program.component';
import { TimelinePickerComponent } from './timeline/timeline-picker/timeline-picker.component';
import { WeightChartComponent } from './weight-chart/weight-chart.component';
import { WeightDialogComponent } from './weight-chart/partials/weight-dialog/weight-dialog.component';
import { SessionDetailsComponent } from './exercises-picker/partials/session-details/session-details.component';

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
        HeaderComponent,
        ManageWorkoutToProgramDialogComponent,
        CollapseMenuComponent,
        InputComponent,
        TimelineProgramComponent,
        TimelinePickerComponent,
        WeightChartComponent,
        WeightDialogComponent,
        SessionDetailsComponent
    ],
    imports: [
        MatTabsModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
        MatListModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TextFieldModule,
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

        //provideFirebaseApp(() => initializeApp(config)),
        // provideFirestore(() => {
        //     const firestore = getFirestore();
        //     connectEmulator(firestore, 'localhost', 8080);
        //     enableIndexedDbPersistence(firestore);
        //     return firestore;
        // }),
        // provideStorage(() => getStorage()),
    ],
    providers: [
        WorkoutService,
        AuthGuard,
        SnackbarService,
        { provide: MAT_TABS_CONFIG, useValue: { animationDuration: 250 } }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
