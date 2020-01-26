import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelecommandeComponent } from './telecommande/telecommande.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { PopupComponent } from './popup/popup.component';
import { ActionTuileComponent } from './actiontuile/actiontuile.component';
import { PopupContentComponent } from './popupcontent/popupcontent.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    TelecommandeComponent,
    PopupComponent,
    ActionTuileComponent,
    PopupContentComponent,
    
  ],
  imports: [
    MatCardModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  entryComponents: [PopupContentComponent], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
