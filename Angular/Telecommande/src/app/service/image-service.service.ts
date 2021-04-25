import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { ConfigService } from '../config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  private desktopObservableTimer;
  private desktopBlobUrl: any;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer, private configService: ConfigService) {
  }
 
  public getImageBureau(): Observable<Blob> {
    return this.http.get(environment.BACKEND_URL + '/imageBureau', { responseType: 'blob' });
  }

  public getImageWebcam(): Observable<Blob> {
    return this.http.get(environment.BACKEND_URL + '/imageWebcam', { responseType: 'blob' });
  }

  public closeWebcamStream(): Observable<any> {
    console.log(environment.BACKEND_URL + '/closeWebcam');
    return this.http.get(environment.BACKEND_URL + '/closeWebcam');
  }

  public startCapture(whichCapture: string){
    switch (whichCapture) {
      case 'imageBureau':
        this.startDesktopCapture();
        break;

      case 'imageWebcam':
        break;
    
      default:
        break;
    }
  }

  public stopCapture(whichCapture: string){
    switch (whichCapture) {
      case 'imageBureau':
        this.desktopObservableTimer.unsubscribe();
        break;

      case 'imageWebcam':
        break;
    
      default:
        break;
    }
  }

  startDesktopCapture(){
    this.desktopObservableTimer = timer(0, 750)
    .pipe(mergeMap(_ => this.getImageBureau()))
    .subscribe(data => {
      this.readDesktopImageFromBackend(data);
    });
  }

  readDesktopImageFromBackend(data) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setDesktopBlobUrl(this.domSanitizer.bypassSecurityTrustUrl(`${environment.BACKEND_URL}/imageBureau`));
    }

    if (data) {
      reader.readAsDataURL(data);
    }
  }


  public setDesktopBlobUrl(blob: any){
    this.desktopBlobUrl = blob;
  }

  public getDesktopBlobUrl(){
    return this.desktopBlobUrl;
  }
}
