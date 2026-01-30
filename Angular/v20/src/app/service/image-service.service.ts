import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EMPTY, Observable, fromEvent, timer } from 'rxjs';
import { concatMap, map, mergeMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private desktopObservableTimer: Observable<void> | null = null;
  private desktopBlobUrl: SafeUrl | null = null;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  public getImageBureau(): Observable<Blob> {
    return this.http.get(environment.BACKEND_URL + '/imageBureau', { responseType: 'blob' });
  }

  public getImageWebcam(): Observable<Blob> {
    return this.http.get(environment.BACKEND_URL + '/imageWebcam', { responseType: 'blob' });
  }

  public closeWebcamStream(): Observable<unknown> {
    return this.http.get(environment.BACKEND_URL + '/closeWebcam');
  }

  public startCapture(whichCapture: string, updateFrequency: number): Observable<void> {
    switch (whichCapture) {
      case 'imageBureau':
        return this.startDesktopCapture(updateFrequency);
      case 'imageWebcam':
        return EMPTY;
      default:
        return EMPTY;
    }
  }

  private startDesktopCapture(updateFrequency: number): Observable<void> {
    this.desktopObservableTimer = timer(0, updateFrequency).pipe(
      concatMap(() => this.getImageBureau()),
      mergeMap((data) => this.readDesktopImageFromBackend(data))
    );
    return this.desktopObservableTimer;
  }

  private readDesktopImageFromBackend(data: Blob): Observable<void> {
    const reader = new FileReader();
    const readerEnd = fromEvent(reader, 'load').pipe(
      take(1),
      map(() => this.domSanitizer.bypassSecurityTrustUrl(`${environment.BACKEND_URL}/imageBureau`)),
      map((safeUrl) => this.setDesktopBlobUrl(safeUrl))
    );

    if (data) {
      reader.readAsDataURL(data);
    }

    return readerEnd;
  }

  public setDesktopBlobUrl(blob: SafeUrl): void {
    this.desktopBlobUrl = blob;
  }

  public getDesktopBlobUrl(): SafeUrl | null {
    return this.desktopBlobUrl;
  }
}
