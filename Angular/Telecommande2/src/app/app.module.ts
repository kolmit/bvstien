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
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TuileConcreteComponent } from './tuile-concrete/tuile-concrete.component';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    TelecommandeComponent,
    TuileConcreteComponent,
    DialogOverviewExampleDialogComponent,
    
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
    FlexLayoutModule,
  ],
  entryComponents: [TuileConcreteComponent, DialogOverviewExampleDialogComponent
], 
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
