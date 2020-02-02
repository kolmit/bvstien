import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelecommandeComponent } from './telecommande/telecommande.component';


const routes: Routes = [
  { path: 'telecommande', component: TelecommandeComponent },
  { path: '', component: TelecommandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
