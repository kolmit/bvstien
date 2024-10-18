import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ImageService } from "src/app/service/image-service.service";
import { PopupToJavaService } from "src/app/service/popup-to-java.service";

@Component({
	selector: "app-desktop-stream",
	templateUrl: "./desktop-stream.component.html",
	styleUrls: ["./desktop-stream.component.css"],
})
export class DesktopStreamComponent implements OnInit, OnDestroy {
	@Input() resize = false;
	@Input() updateFrequency = 750;

	constructor(private imageService: ImageService, private javaService: PopupToJavaService) {}

	getDesktopBlobUrl() {
		return this.imageService.getDesktopBlobUrl();
	}

	getClickPosition(e) {
		var xPosition = e.offsetX;
		var yPosition = e.offsetY;
		console.log("(", xPosition, " ; ", yPosition, ")", e);

		this.javaService.sendLeftClick(xPosition, yPosition).subscribe((res) => {});
	}

	ngOnInit() {
		this.imageService.startCapture("imageBureau", this.updateFrequency);
	}

	ngOnDestroy() {
		this.imageService.stopCapture("imageBureau");
	}
}
