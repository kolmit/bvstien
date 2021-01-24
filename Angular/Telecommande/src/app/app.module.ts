import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelecommandeComponent } from './telecommande/telecommande.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule, MatDialogModule, MatInputModule, MatSliderModule, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PopupToJavaService } from './service/popup-to-java.service';
import { SliderVolumeComponent } from './slider-volume/slider-volume.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ImageService } from './service/image-service.service';
import { PopupImageBureauComponent } from './desktop/popup-image-bureau/popup-image-bureau.component';
import { MuteVolumeComponent } from './mute-volume/mute-volume.component';
import { YoutubeUnitComponent } from './youtube-unit/youtube-unit.component';
import { FilterYoutubePipe } from './filter-youtube.pipe';
import { WINDOW_PROVIDERS } from 'src/environments/window-provider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CameraTileComponent } from './camera/camera-tile/camera-tile.component';
import { PopupCameraComponent } from './camera/popup-camera/popup-camera.component';
import { DesktopTileComponent } from './desktop/desktop-tile/desktop-tile.component';
import { TelevisionTileComponent } from './television/television-tile/television-tile.component';
import { PopupAlttabComponent } from './television/popup-remote-tv/popup-alttab/popup-alttab.component';
import { PopupRemoteTvComponent } from './television/popup-remote-tv/popup-remote-tv.component';
import { YoutubeTileComponent } from './youtube/youtube-tile/youtube-tile.component';
import { PopupYoutubeComponent } from './youtube/popup-youtube/popup-youtube.component';
import { VolumeSwitchTileComponent } from './volume-switch/volume-switch-tile/volume-switch-tile.component';
import { ShutdownTileComponent } from './shutdown/shutdown-tile/shutdown-tile.component';
import { PopupContentComponent } from './shutdown/popup-content/popup-content.component';

@NgModule({
  declarations: [
    AppComponent,
    TelecommandeComponent,
    PopupContentComponent,
    SliderVolumeComponent,
    PopupImageBureauComponent,
    MuteVolumeComponent,
    PopupYoutubeComponent,
    YoutubeUnitComponent,
    FilterYoutubePipe,
    PopupRemoteTvComponent,
    PopupAlttabComponent,
    PopupCameraComponent,
    CameraTileComponent,
    DesktopTileComponent,
    TelevisionTileComponent,
    YoutubeTileComponent,
    VolumeSwitchTileComponent,
    ShutdownTileComponent,
  ],
  exports: [
    YoutubeUnitComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [HttpClient, PopupToJavaService, ImageService, WINDOW_PROVIDERS
  ],
  entryComponents: [
    PopupContentComponent, 
    PopupYoutubeComponent,
    PopupRemoteTvComponent,
    PopupImageBureauComponent,
    PopupAlttabComponent,
    PopupCameraComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
