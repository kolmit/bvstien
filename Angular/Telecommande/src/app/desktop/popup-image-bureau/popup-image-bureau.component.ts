import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService } from '../../service/image-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupToJavaService } from '../../service/popup-to-java.service';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-popup-image-bureau',
  templateUrl: './popup-image-bureau.component.html',
  styleUrls: ['./popup-image-bureau.component.css']
})
export class PopupImageBureauComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private javaService: PopupToJavaService) { }

  blobData: any;
  private imageObservableTimer: any;
  keyboardInputValue: string = '';
  private myCaptureDevice: string = 'imageBureau'

  @HostListener('document:keyup', ['$event'])
  keyboardKeyPressed(event: KeyboardEvent){
    console.log('-->up ', event);
    if (event.isTrusted){
      this.javaService.typeKeyboardKey(event.key).subscribe((res) => {
      });
    }
  }
  
  ngOnInit() {
    this.imageService.startCapture(this.myCaptureDevice);
  }
  
  ngOnDestroy() {
    this.imageService.stopCapture(this.myCaptureDevice);
  }

  getClickPosition(e) {
    var xPosition = e.offsetX;
    var yPosition = e.offsetY;
    console.log("(", xPosition, " ; ", yPosition, ")", e);

    this.javaService.sendLeftClick(xPosition, yPosition).subscribe((res) => {
    });
  }
}
