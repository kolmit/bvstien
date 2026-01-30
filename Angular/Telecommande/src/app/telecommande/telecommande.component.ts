import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
	selector: 'app-telecommande',
	templateUrl: './telecommande.component.html',
	styleUrls: ['./telecommande.component.css'],
})
export class TelecommandeComponent {
	desktopView = 'desktop-view';
	swipeLeftIcon = 'desktop_windows';
	cameraView = 'camera-view';
	swipeRightIcon = 'camera_alt';

	ratioWidth: number = 1;
	ratioHeigth: number = 1;

	videoSurveillanceMode: boolean = environment.videoSurveillance;
	@ViewChild('desktopMiniature', { static: false }) private view!: ElementRef<any>;

	desktopImageLoaded() {
		const width = this.view.nativeElement.offsetWidth;
		const height = this.view.nativeElement.offsetHeight;

		this.ratioWidth = 6000/width;
		this.ratioHeigth = 1440/height;
	}
}
