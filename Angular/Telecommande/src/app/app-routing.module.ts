import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesktopViewComponent } from './desktop/desktop-view/desktop-view.component';
import { CameraViewComponent } from './camera/camera-view/camera-view.component';
import { TelecommandeComponent } from './telecommande/telecommande.component';


const routes: Routes = [
  { path: 'camera-view', component: CameraViewComponent },
  { path: 'desktop-view', component: DesktopViewComponent },
  { path: 'remote', component: TelecommandeComponent },
  { path: '', component: TelecommandeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
