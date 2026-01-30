import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-youtube-unit',
  templateUrl: './youtube-unit.component.html',
  styleUrls: ['./youtube-unit.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class YoutubeUnitComponent implements OnInit {
  readonly video = input<any | null>(null);
  public urlVideo = '';

  constructor() { }

  ngOnInit() {
    const current = this.video();
    if (current?.id?.videoId) {
      this.urlVideo = "https://www.youtube.com/watch?v=" + current.id.videoId;
    }
  }

}
