import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-youtube-unit',
  templateUrl: './youtube-unit.component.html',
  styleUrls: ['./youtube-unit.component.css']
})
export class YoutubeUnitComponent implements OnInit, OnChanges {
  @Input() video: any;
  public urlVideo: string;

  constructor() { }

  ngOnInit() {
    this.urlVideo = "https://www.youtube.com/watch?v=" + this.video.id.videoId;
  }

  ngOnChanges(){
  }

}
