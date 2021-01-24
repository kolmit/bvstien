import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, timer } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { ConfigService } from '../../config.service';
import { ImageService } from '../../service/image-service.service';
import { PopupToJavaService } from '../../service/popup-to-java.service';

@Component({
  selector: 'app-popup-camera',
  templateUrl: './popup-camera.component.html',
  styleUrls: ['./popup-camera.component.css']
})
export class PopupCameraComponent implements OnInit, OnDestroy {

  constructor(
    private imageService: ImageService,
    private javaService: PopupToJavaService,
    private configService: ConfigService,
    private domSanitizer: DomSanitizer) { }

  isImageLoading: boolean;
  blobData: any;
  private dialogOpened = new Subject<boolean>();
  private refreshImage: any;
  keyboardInputValue: string = '';


  ngOnInit() {
    this.refreshImage = timer(0, 750)
    .pipe(
      mergeMap(_ => this.imageService.getImageWebcam()),
      takeUntil(this.dialogOpened))
    .subscribe(data => {
      this.readData(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  ngOnDestroy() {
    this.refreshImage.unsubscribe();
  }


  callImageBureauService(){
    this.imageService.getImageWebcam()
    .subscribe(data => {
      this.readData(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  readData(data) {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.blobData = this.domSanitizer.bypassSecurityTrustUrl(`${this.configService.getBackEndUrl()}/imageWebcam`);
    } 

    if (data) {
      reader.readAsDataURL(data);
    }
  }
}
