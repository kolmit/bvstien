import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesComponent } from './exercises-picker/exercises-picker.component';
import { LoginComponent } from './auth/login/login.component';
import { WorkoutPickerComponent } from './workout-picker/workout-picker.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'workout', component: WorkoutPickerComponent, canActivate: [AuthGuard]  },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
