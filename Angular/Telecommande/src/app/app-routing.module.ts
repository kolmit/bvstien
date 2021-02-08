import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesktopMainComponent } from './desktop-main/desktop-main.component';
import { TelecommandeComponent } from './telecommande/telecommande.component';


const routes: Routes = [
  { path: 'desktop', component: DesktopMainComponent },
  { path: '', component: TelecommandeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
