import { Component, OnInit, HostListener, Input } from "@angular/core";
import { ImageService } from "../../service/image-service.service";
import { PopupToJavaService } from "../../service/popup-to-java.service";

@Component({
	selector: "app-popup-image-bureau",
	templateUrl: "./popup-image-bureau.component.html",
	styleUrls: ["./popup-image-bureau.component.css"],
})
export class PopupImageBureauComponent {
	constructor(private imageService: ImageService, private javaService: PopupToJavaService) {}

	blobData: any;
	displayKeyboard: boolean = false;
	keyboardInputValue: string = "";
	private myCaptureDevice: string = "imageBureau";

	@HostListener("document:keyup", ["$event"])
	keyboardKeyPressed(event: KeyboardEvent) {
		if (event.isTrusted) {
			this.javaService.typeKeyboardKey(event.key).subscribe((res) => {});
		}
	}

	toggleKeyboard() {
		this.displayKeyboard = !this.displayKeyboard;
	}

	getDesktopBlobUrl() {
		return this.imageService.getDesktopBlobUrl();
	}
}
