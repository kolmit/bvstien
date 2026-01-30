import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PopupToJavaService } from '../../service/popup-to-java.service';

@Component({
  selector: 'app-popup-youtube',
  templateUrl: './popup-youtube.component.html',
  styleUrls: ['./popup-youtube.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class PopupYoutubeComponent {
  videos: any[] = [];
  search = '';
  onRead = false;

  constructor(private javaService: PopupToJavaService) {}

  onSubmit() {
    if (this.search) {
      this.javaService.getYoutubeVideo(this.search);
      this.onRead = true;
      this.search = '';
    }
  }

  closeCurrentTab() {
    this.javaService.getCloseTab().subscribe(() => console.log('Onglet fermé.'));
    this.onRead = false;
  }

  switchMonitor() {
    this.javaService.getSwitchMonitor().subscribe((res) => console.log(res));
  }

  thisVideoGotSelected(video: any) {
    this.javaService.getYoutubeVideo(video.id.videoId);
  }
}
