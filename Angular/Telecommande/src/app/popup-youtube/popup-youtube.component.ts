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
export class PopupYoutubeComponent implements OnInit {
  videos: any[];
  search = '';
  onRead = false;
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

  onSubmit(){
    this.javaService.getYoutubeVideo(this.search);
    this.onRead = true;
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
