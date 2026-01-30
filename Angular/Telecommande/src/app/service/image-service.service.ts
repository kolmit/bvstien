import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { fromEvent, Observable, timer } from "rxjs";
import { ConfigService } from "../config.service";
import { DomSanitizer } from "@angular/platform-browser";
import { concatMap, map, mergeMap, take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ImageService {
	private desktopObservableTimer;
	private desktopBlobUrl: any;

	constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private configService: ConfigService) {}

	public getImageBureau(): Observable<Blob> {
		return this.http.get(environment.BACKEND_URL + "/imageBureau", { responseType: "blob" });
	}

	public getImageWebcam(): Observable<Blob> {
		return this.http.get(environment.BACKEND_URL + "/imageWebcam", { responseType: "blob" });
	}

	public closeWebcamStream(): Observable<any> {
		console.log(environment.BACKEND_URL + "/closeWebcam");
		return this.http.get(environment.BACKEND_URL + "/closeWebcam");
	}

	public startCapture(whichCapture: string, updateFrequency: number): Observable<any> {
		switch (whichCapture) {
			case "imageBureau":
				return this.startDesktopCapture(updateFrequency);

			case "imageWebcam":
				break;

			default:
				break;
		}
	}

	startDesktopCapture(updateFrequency: number): Observable<number> {
		this.desktopObservableTimer = timer(0, updateFrequency)
			.pipe(
				concatMap((_) => this.getImageBureau()),
				mergeMap((data) => this.readDesktopImageFromBackend(data))
			);
		return this.desktopObservableTimer;
	}

	readDesktopImageFromBackend(data): Observable<void> {
		const reader = new FileReader();
		const readerEnd = fromEvent(reader, 'load').pipe(
			take(1),
			map(() => reader.result as string),
			map(() => this.setDesktopBlobUrl(this.domSanitizer.bypassSecurityTrustUrl(`${environment.BACKEND_URL}/imageBureau`)))
		);
		if (data) {
			reader.readAsDataURL(data);
		}
		return readerEnd;
	}

	public setDesktopBlobUrl(blob: any) {
		this.desktopBlobUrl = blob;
	}

	public getDesktopBlobUrl() {
		return this.desktopBlobUrl;
	}
}
