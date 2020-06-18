import { Component, OnInit, OnChanges } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { YoutubeService } from '../service/youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-youtube',
  templateUrl: './popup-youtube.component.html',
  styleUrls: ['./popup-youtube.component.css']
})
export class PopupYoutubeComponent implements OnInit, OnChanges {
  videos: any[];
  search = '';
  youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("www.youtube.com")

  constructor(private sanitizer: DomSanitizer, private spinner: NgxSpinnerService, private youTubeService: YoutubeService, private javaService: PopupToJavaService) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UCSLeoz5odIGS2GdlbHbCAUg', 15)
      .pipe()
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }
      });
  }

  ngOnChanges(){
    console.log("seek" + this.search);
    this.youTubeService.searchVideo(this.search);
  }

  thisVideoGotSelected(video){
    this.javaService.getYoutubeVideo(video.id.videoId);
  }

  /*playThisVideo(){
    this.javaService.playThisVideo()
  }*/
}
