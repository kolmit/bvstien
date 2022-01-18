import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisePickerComponent } from './exercises-picker/exercises-picker.component';
import { LoginComponent } from './auth/login/login.component';
import { WorkoutPickerComponent } from './workout-picker/workout-picker.component';
import { AuthGuard } from './auth/auth.guard';
import { ConfigurationComponent } from './configuration/configuration.component';


const routes: Routes = [
  { path: 'workout', component: WorkoutPickerComponent, canActivate: [AuthGuard]  },
  { path: 'exercises', component: ExercisePickerComponent, canActivate: [AuthGuard]  },
  { path: 'configure', component: ConfigurationComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
