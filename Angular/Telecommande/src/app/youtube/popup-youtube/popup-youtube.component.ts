import { Component, OnInit, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { PopupToJavaService } from 'src/app/service/popup-to-java.service';

@Component({
  selector: 'app-popup-youtube',
  templateUrl: './popup-youtube.component.html',
  styleUrls: ['./popup-youtube.component.css']
})
export class PopupYoutubeComponent {
  videos: any[];
  search = '';
  onRead = false;
  youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("www.youtube.com")

  constructor(
    private sanitizer: DomSanitizer, 
    private javaService: PopupToJavaService) { }

  onSubmit(){
    if (this.search){
      this.javaService.getYoutubeVideo(this.search);
      this.onRead = true;
      this.search = '';
    }
  }

  closeCurrentTab(){
    this.javaService.getCloseTab().subscribe((res) => console.log("Onglet fermé."));
    this.onRead = false;
  }

  switchMonitor() {
    this.javaService.getSwitchMonitor().subscribe((res) => console.log(res));
  }

  thisVideoGotSelected(video){
    this.javaService.getYoutubeVideo(video.id.videoId);
  }
}
