import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import { ImageService } from "src/app/service/image-service.service";
import { PopupToJavaService } from "src/app/service/popup-to-java.service";
import {Subscription} from "rxjs";

@Component({
	selector: "app-desktop-stream",
	templateUrl: "./desktop-stream.component.html",
	styleUrls: ["./desktop-stream.component.css"],
})
export class DesktopStreamComponent implements OnInit, OnDestroy {
	@Input() resize = false;
	@Input() updateFrequency = 750;
	@Input() ratioWidth = 1;
	@Input() ratioHeight = 1;

	@Output() imageLoaded = new EventEmitter<void>();

	captureSubscription: Subscription = null;

	constructor(private imageService: ImageService, private javaService: PopupToJavaService) {}

	getDesktopBlobUrl() {
		return this.imageService.getDesktopBlobUrl();
	}

	getClickPosition(e) {
		var xPosition = e.offsetX;
		var yPosition = e.offsetY;
		console.log("(", xPosition, " ; ", yPosition, ")", e);
		console.log("(", xPosition*this.ratioWidth, " ; ", yPosition*this.ratioHeight, ")", e);

		this.javaService.sendLeftClick(xPosition*this.ratioWidth, yPosition*this.ratioHeight).subscribe();
	}

	ngOnInit() {
		this.captureSubscription = this.imageService.startCapture("imageBureau", this.updateFrequency)
			.subscribe(() => this.imageLoaded.emit());
	}

	ngOnDestroy() {
		this.captureSubscription.unsubscribe()
	}
}
