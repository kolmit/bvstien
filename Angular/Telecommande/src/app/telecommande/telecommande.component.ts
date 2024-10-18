import { Component } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-telecommande",
	templateUrl: "./telecommande.component.html",
	styleUrls: ["./telecommande.component.css"],
})
export class TelecommandeComponent {
	desktopView: string = "desktop-view";
	swipeLeftIcon: string = "desktop_windows";
	cameraView: string = "camera-view";
	swipeRightIcon: string = "camera_alt";

	videoSurveillanceMode: boolean = environment.videoSurveillance;

	constructor() {}
}
