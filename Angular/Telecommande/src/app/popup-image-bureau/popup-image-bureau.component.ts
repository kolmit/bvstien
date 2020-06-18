import { Component, OnInit, Inject } from '@angular/core';
import { ImageService } from '../service/image-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { Subject, timer } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { WINDOW } from 'src/environments/window-provider';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-popup-image-bureau',
  templateUrl: './popup-image-bureau.component.html',
  styleUrls: ['./popup-image-bureau.component.css']
})
export class PopupImageBureauComponent implements OnInit {

  constructor(
    private imageService: ImageService,
    private javaService: PopupToJavaService,
    private configService: ConfigService,
    private domSanitizer: DomSanitizer) { }

  isImageLoading: boolean;
  blobData: any;
  private dialogOpened = new Subject<boolean>();
  private refreshImage: any;

  ngOnInit() {
    this.refreshImage = timer(0, 1500)
    .pipe
    (mergeMap(_ => this.imageService.getImageBureau()),
      takeUntil(this.dialogOpened))
    .subscribe(data => {
      this.lul(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }


  ngOnDestroy() {
    this.refreshImage.unsubscribe();
  }


  lul(data) {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.blobData = this.domSanitizer.bypassSecurityTrustUrl(`${this.configService.getBackEndUrl()}/imageBureau`);
    }

    if (data) {
      reader.readAsDataURL(data);
    }
  }

  getClickPosition(e) {
    var container = document.querySelector(".lul");

    var parentPosition = this.getPosition(container);
    var xPosition = e.offsetX;
    var yPosition = e.offsetY;
    console.log("(", xPosition, " ; ", yPosition, ")");

    this.javaService.sendLeftClick(xPosition, yPosition).subscribe((res) => {
      console.log(res);
    });
  }

  // Helper function to get an element's exact position
  getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }
}
