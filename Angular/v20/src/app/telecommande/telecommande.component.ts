import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ShutdownTileComponent } from '../shutdown/shutdown-tile/shutdown-tile.component';
import { SliderVolumeComponent } from '../slider-volume/slider-volume.component';
import { VolumeSwitchTileComponent } from '../volume-switch/volume-switch-tile/volume-switch-tile.component';
import { TelevisionTileComponent } from '../television/television-tile/television-tile.component';
import { DesktopTileComponent } from '../desktop/desktop-tile/desktop-tile.component';
import { CameraTileComponent } from '../camera/camera-tile/camera-tile.component';
import { YoutubeTileComponent } from '../youtube/youtube-tile/youtube-tile.component';
import { DesktopStreamComponent }  from '../desktop/desktop-stream/desktop-stream.component';

@Component({
	selector: 'app-telecommande',
	templateUrl: './telecommande.component.html',
	styleUrls: ['./telecommande.component.css'],
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		ShutdownTileComponent,
		SliderVolumeComponent,
		VolumeSwitchTileComponent,
		TelevisionTileComponent,
		DesktopTileComponent,
		CameraTileComponent,
		YoutubeTileComponent,
		DesktopStreamComponent
	]
})
export class TelecommandeComponent {
	desktopView = 'desktop-view';
	swipeLeftIcon = 'desktop_windows';
	cameraView = 'camera-view';
	swipeRightIcon = 'camera_alt';

	ratioWidth: number = 1;
	ratioHeigth: number = 1;

	@ViewChild('desktopMiniature', { static: false }) private view!: ElementRef<any>;

	desktopImageLoaded() {
		const width = this.view.nativeElement.offsetWidth;
		const height = this.view.nativeElement.offsetHeight;

		this.ratioWidth = 6000/width;
		this.ratioHeigth = 1440/height;
	}
}
