import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectionStrategy } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelecommandeComponent } from './telecommande/telecommande.component';
import { TuileShutdownComponent } from './tuile-shutdown/tuile-shutdown.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule, MatDialogModule, MatInputModule, MatSliderModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PopupContentComponent } from './popup-content/popup-content.component';
import { PopupContentVolumeComponent } from './popup-content-volume/popup-content-volume.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { PopupToJavaService } from './service/popup-to-java.service';
import { SliderVolumeComponent } from './slider-volume/slider-volume.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    TelecommandeComponent,
    TuileShutdownComponent,
    PopupContentComponent,
    PopupContentVolumeComponent,
    SliderVolumeComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatSliderModule,
    MatSlideToggleModule,
    ScrollingModule,
    MatSelectModule,
  ],
  providers: [HttpClient, PopupToJavaService],
  entryComponents: [
    PopupContentComponent, 
    PopupContentVolumeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
